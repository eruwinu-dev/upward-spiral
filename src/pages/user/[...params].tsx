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
import { parsePath } from "@/utils/parsePath"
import { slugify } from "@/utils/slugify"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import React from "react"

type Props = {}

const Program = ({}: Props) => {
    return (
        <>
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

    context.res.setHeader("Set-Cookie", [
        `userId=${user.id}; Max-Age=36000; Path=/`,
        `timezone=${user.timezone}; Max-Age=36000; Path=/`,
    ])
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

    const { program, habit, week, day } = parsePath(context.query.params)

    const selectedProgram = programs.find(
        (programItem) => programItem.slug == program
    )

    if (selectedProgram) {
        await queryClient.prefetchQuery({
            queryKey: ["user", "program", program, "habits"],
            queryFn: async () =>
                getHabits({
                    userId: user.id,
                    programId: selectedProgram.id,
                    role: "USER",
                }),
        })
    } else {
        return {
            notFound: true,
        }
    }

    if (habit) {
        const habits = await getHabits({
            userId: user.id,
            programId: selectedProgram.id,
            role: "USER",
        })
        const selectedHabit = habits.find(
            (habitItem) => slugify(habitItem.title) === habit
        )
        if (!selectedHabit) {
            return {
                notFound: true,
            }
        }
    }

    if (
        Number(week) < 1 ||
        Number(week) > 15 ||
        Number(day) < 1 ||
        Number(day) > 7
    ) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Program
