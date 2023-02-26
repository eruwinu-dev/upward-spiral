import AddHabitDialog from "@/components/User/AddHabitDialog"
import AddLogDialog from "@/components/User/AddLogDialog"
import AddProgramDialog from "@/components/User/AddProgramDialog"
import DeleteProgramDialog from "@/components/User/DeleteProgramDialog"
import ProgramHabits from "@/components/User/ProgramHabits"
import UserSideBar from "@/components/User/UserSideBar"
import UserTopBar from "@/components/User/UserTopBar"
import { getHabits } from "@/lib/habit/getHabits"
import { getPrograms } from "@/lib/program/getPrograms"
import { checkUser } from "@/utils/checkUser"
import { matchParams } from "@/utils/parameters"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

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
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8 col-span-7">
                    <UserTopBar />
                    <ProgramHabits />
                </div>
            </section>
            <AddProgramDialog />
            <AddLogDialog />
            <AddHabitDialog />
            <DeleteProgramDialog />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        query: { params },
    } = context
    const user = await checkUser(context)

    if (!user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const paramsMap = matchParams(params)

    const programs = await getPrograms(user.id)

    const program = paramsMap.has("slug")
        ? programs.find((program) => program.slug === paramsMap.get("slug"))
        : undefined

    if (!program)
        return {
            notFound: true,
        }

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => user,
    })

    await queryClient.prefetchQuery({
        queryKey: ["user", "programs"],
        queryFn: async () => programs,
    })

    await queryClient.prefetchQuery({
        queryKey: ["user", "program", program.slug, "habits"],
        queryFn: async () => getHabits(program.id, user.id),
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Program
