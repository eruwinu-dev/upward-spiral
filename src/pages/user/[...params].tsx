import AddHabitDialog from "@/components/User/AddHabitDialog"
import AddLogDialog from "@/components/User/AddLogDialog"
import AddProgramDialog from "@/components/User/AddProgramDialog"
import DeleteHabitDialog from "@/components/User/DeleteHabitDialog"
import DeleteProgramDialog from "@/components/User/DeleteProgramDialog"
import ProgramHabits from "@/components/User/ProgramHabits"
import UserSideBar from "@/components/User/UserSideBar"
import ViewLogDialog from "@/components/User/ViewLogDialog"
import { getHabits } from "@/lib/habit/getHabits"
import { getPrograms } from "@/lib/program/getPrograms"
import { checkUser } from "@/utils/checkUser"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import nookies from "nookies"

type Props = {}

const Program = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Home | Dynamic</title>
            </Head>

            <section className="grid grid-cols-12 grid-flow-row min-h-screen max-h-screen">
                <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 col-span-5 border-r-2 px-2 flex flex-col items-start justify-start space-y-2">
                    <UserSideBar />
                </div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8 col-span-7 relative grid grid-cols-12 grid-flow-row gap-x-4">
                    <ProgramHabits />
                </div>
            </section>
            <AddProgramDialog />
            <ViewLogDialog />
            <AddHabitDialog />
            <DeleteHabitDialog />
            <DeleteProgramDialog />
            <AddLogDialog />
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

    nookies.set(context, "timezone", user.timezone, {
        maxAge: 30 * 24 * 60 * 60,
    })

    nookies.set(context, "userId", user.id, {
        maxAge: 30 * 24 * 60 * 60,
    })

    const queryClient = new QueryClient()

    const programs = await getPrograms({ userId: user.id, role: "USER" })

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => user,
    })

    await queryClient.prefetchQuery({
        queryKey: ["user", "programs"],
        queryFn: async () => programs,
    })

    if (programs.length) {
        await queryClient.prefetchQuery({
            queryKey: ["user", "program", programs[0].slug, "habits"],
            queryFn: async () =>
                getHabits({
                    userId: user.id,
                    programId: programs[0].id,
                    role: "USER",
                }),
        })
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Program
