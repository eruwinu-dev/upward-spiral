import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useCheckDate } from "@/hooks/date/useCheckDate"
import { UserDialog } from "@/types/user"
import { Habit } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    habit: Habit
    day: number
}

const HabitLog = ({ habit, day }: Props) => {
    const { mutateAsync: checkDate } = useCheckDate()

    const { push, pathname, program, week, render, renderPath } =
        usePageRender()
    const { toggleDialog } = useUserContext()

    const openLogDialogHandler =
        (prop: keyof UserDialog) =>
        async (event: MouseEvent<HTMLButtonElement>) => {
            toggleDialog(prop)
            push(
                {
                    pathname,
                    query: render === "static" ? { program, week, day } : {},
                },
                renderPath({ program, week, day: String(day) }),
                { shallow: true }
            )
        }

    return (
        <div>
            <button
                type="button"
                className="btn btn-sm btn-square btn-ghost"
                onClick={openLogDialogHandler("addLog")}
            >
                {Icons("plus")}
            </button>
        </div>
    )
}

export default HabitLog
