import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { HabitLogSlot } from "@/types/log"
import { UserDialog } from "@/types/user"
import { Habit } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    slug: string
    slot: HabitLogSlot
}

const HabitLog = ({
    slug,
    slot: { dateString, isTarget, isLapsed, isToday, log, day },
}: Props) => {
    const { push, pathname, program, week, render, renderPath } =
        usePageRender()
    const { toggleDialog } = useUserContext()

    const openLogDialogHandler =
        (prop: keyof UserDialog) => (event: MouseEvent<HTMLButtonElement>) => {
            toggleDialog(prop)
            push(
                {
                    pathname,
                    query:
                        render === "static"
                            ? {
                                  program,
                                  week,
                                  day,
                                  habit: slug,
                              }
                            : {},
                },
                renderPath({
                    program,
                    week,
                    day: String(day),
                    habit: slug,
                }),
                { shallow: true }
            )
        }

    if (!isTarget)
        return <div className="inline-flex items-center justify-center" />

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
