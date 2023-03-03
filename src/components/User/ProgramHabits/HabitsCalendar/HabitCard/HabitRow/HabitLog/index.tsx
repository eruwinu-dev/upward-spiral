import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { SortedLog } from "@/types/log"
import { UserDialog } from "@/types/user"
import { Habit } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    habit: Habit
    dayNumber: number
    sortedLog: SortedLog
}

const HabitLog = ({
    habit,
    dayNumber,
    sortedLog: { dateString, isToday, isLapsed, log },
}: Props) => {
    const { push, pathname, program, week, day, render, renderPath } =
        usePageRender()
    const { toggleDialog } = useUserContext()

    const weekNumber = Number(week)
    const isOtherWeek = Boolean(weekNumber % 2)

    const openLogDialogHandler =
        (prop: keyof UserDialog) =>
        async (event: MouseEvent<HTMLButtonElement>) => {
            toggleDialog(prop)
            push(
                {
                    pathname,
                    query:
                        render === "static"
                            ? { program, week, day, habit: habit.slug }
                            : {},
                },
                renderPath({
                    program,
                    week,
                    day: String(dayNumber),
                    habit: habit.slug,
                }),
                { shallow: true }
            )
        }

    if (
        (habit.frequency === "WEEKLY" && habit.repeatDay !== dayNumber) ||
        (habit.frequency === "BIWEEKLY" &&
            (!isOtherWeek || habit.repeatDay !== dayNumber))
    )
        return <div className="inline-flex items-center justify-center"></div>

    return (
        <div className="tooltip" data-tip={dateString}>
            {log ? (
                <button
                    type="button"
                    className="btn btn-sm btn-square btn-success"
                    onClick={openLogDialogHandler("viewLog")}
                >
                    {Icons("calendar-check")}
                </button>
            ) : isToday ? (
                <button
                    type="button"
                    className="btn btn-sm btn-square btn-primary"
                    onClick={openLogDialogHandler("addLog")}
                >
                    {Icons("plus")}
                </button>
            ) : isLapsed ? (
                <button
                    type="button"
                    className="btn btn-sm btn-square btn-error btn-outline"
                    onClick={openLogDialogHandler("viewLog")}
                >
                    {Icons("calendar-cross")}
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-sm btn-square"
                    disabled
                >
                    {Icons("plus")}
                </button>
            )}
        </div>
    )
}

export default HabitLog
