import { useGetDates } from "@/hooks/date/useGetDates"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import { useGetLogs } from "@/hooks/log/useGetLogs"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import { matchParams } from "@/utils/parameters"
import { useRouter } from "next/router"
import React, { MouseEvent } from "react"
import HabitCard from "./HabitCard"

type Props = {}

const ProgramHabits = ({}: Props) => {
    const {
        query: { params, week },
        pathname,
        push,
    } = useRouter()
    const { data: habits, isLoading } = useGetHabits()
    const { data: program } = useGetProgram()
    const { data: logs } = useGetLogs()
    const { data: dates } = useGetDates()

    const habitTypes = habits ? Object.keys(habits) : []

    const paramsMap = matchParams(params)

    const weekNumber = Number(
        pathname.endsWith("[...params]") ? paramsMap.get("week") : week
    )

    const toggleWeek =
        (direction: -1 | 1) => async (event: MouseEvent<HTMLButtonElement>) => {
            if (!program) return
            push(
                {
                    pathname: ``,
                    query: {
                        program: program.slug,
                        week: weekNumber + direction,
                    },
                },
                `/home/program/${program.slug}/week/${weekNumber + direction}`,
                { shallow: true }
            )
        }

    if (isLoading) return <></>

    if (!program)
        return (
            <>
                <div className="w-full aspect-video grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <h1 className="text-2xl font-bold">No programs yet.</h1>
                    <p>Wait for an instructor to assign a program to you.</p>
                </div>
            </>
        )

    if (!habits || !habitTypes.length)
        return (
            <>
                <div className="w-full grid grid-cols-1 grid-flow-row place-items-center">
                    No program selected.
                </div>
            </>
        )

    return (
        <>
            <div className="p-4 grid grid-cols-2 grid-flow-row">
                <div className="inline-flex items-center space-x-2">
                    <div className="btn-group">
                        <button
                            className="btn btn-sm btn-ghost"
                            disabled={weekNumber === 1}
                            onClick={toggleWeek(-1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
                                />
                            </svg>
                        </button>
                        <button
                            className="btn btn-sm btn-ghost"
                            disabled={weekNumber === 15}
                            onClick={toggleWeek(1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="font-semibold block">{`Week ${weekNumber}`}</p>
                </div>
            </div>
            <div className="min-h-fit max-h-[85vh] overflow-auto grid grid-cols-1 grid-flow-row gap-8 p-4">
                {habitTypes.map((habitType) => (
                    <HabitCard key={habitType} habits={habits[habitType]} />
                ))}
            </div>
        </>
    )
}

export default ProgramHabits
