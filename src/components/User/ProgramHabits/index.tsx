import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import React from "react"
import UserTopBar from "../UserTopBar"
import HabitsCalendar from "./HabitsCalendar"

type Props = {}

const ProgramHabits = (props: Props) => {
    const { program: slug } = usePageRender()
    const { data: program } = useGetProgram()
    const { data: groups } = useGetHabits()

    if (!slug)
        return (
            <>
                <div className="w-full aspect-video grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4 col-span-12">
                    <div>No program selected.</div>
                </div>
            </>
        )

    if (!program || !groups) return <></>

    return (
        <>
            <UserTopBar program={program} />
            <HabitsCalendar groups={groups} />
        </>
    )
}

export default ProgramHabits
