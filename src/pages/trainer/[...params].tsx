import AddTraineeDialog from "@/components/Trainer/AddTraineeDialog"
import DeleteTraineeDialog from "@/components/Trainer/DeleteTraineeDialog"
import ProgramDashboard from "@/components/Trainer/ProgramDashboard"
import AddHabitDialog from "@/components/User/AddHabitDialog"
import AddProgramDialog from "@/components/User/AddProgramDialog"
import DeleteHabitDialog from "@/components/User/DeleteHabitDialog"
import DeleteProgramDialog from "@/components/User/DeleteProgramDialog"
import EditHabitDialog from "@/components/User/EditHabitDialog"
import UserSideBar from "@/components/User/UserSideBar"
import { getHabitTypes } from "@/lib/habit/getHabitTypes"
import { getPrograms } from "@/lib/program/getPrograms"

import { checkUser } from "@/utils/checkUser"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {}

const Home = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Admin | Dynamic</title>
            </Head>
            <section className="grid grid-cols-12 grid-flow-row min-h-screen max-h-screen">
                <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 col-span-5 border-r-2 px-2 flex flex-col items-start justify-start space-y-2">
                    <UserSideBar />
                </div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8 col-span-7 relative grid grid-cols-12 grid-flow-row gap-x-4">
                    <ProgramDashboard />
                </div>
            </section>
            <AddProgramDialog />
            <AddHabitDialog />
            <EditHabitDialog />
            <DeleteHabitDialog />
            <DeleteProgramDialog />
            <AddTraineeDialog />
            <DeleteTraineeDialog />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    if (!user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    if (user.role === "USER") {
        return {
            redirect: {
                destination: "/home",
                permanent: false,
            },
        }
    }

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => user,
    })

    await queryClient.prefetchQuery({
        queryKey: ["trainer", "programs"],
        queryFn: async () => await getPrograms(user.id, "TRAINER"),
    })

    await queryClient.prefetchQuery({
        queryKey: ["trainer", "habits", "types"],
        queryFn: async () => await getHabitTypes(),
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Home
