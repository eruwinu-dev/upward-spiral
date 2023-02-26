import useUserContext from "@/context/UserState"
import { useCheckDate } from "@/hooks/date/useCheckDate"
import { UserDialog } from "@/types/user"
import { matchParams } from "@/utils/parameters"
import { Habit } from "@prisma/client"
import { useRouter } from "next/router"
import React, { MouseEvent } from "react"

type Props = {
    habit: Habit
    day: number
}

const HabitLog = ({ habit, day }: Props) => {
    const { mutateAsync: checkDate } = useCheckDate()

    const {
        push,
        query: { params, program: programSlug, week: programWeek },
        pathname,
    } = useRouter()
    const { toggleDialog } = useUserContext()

    const paramsMap = matchParams(params)

    const slug = pathname.endsWith("[...params]")
        ? paramsMap.get("slug") || ""
        : programSlug

    const week = pathname.endsWith("[...params]")
        ? Number(paramsMap.get("week")) || 0
        : Number(programWeek)

    const openLogDialogHandler =
        (prop: keyof UserDialog) =>
        async (event: MouseEvent<HTMLButtonElement>) => {
            toggleDialog(prop)
            const date = await checkDate({
                createdAt: habit.createdAt,
                week,
                day,
            })
            push(
                {
                    pathname: slug ? "" : `/home`,
                    query: { program: slug, week, day },
                },
                slug
                    ? `/home/program/${slug}/week/${week}/day/${day}`
                    : undefined,
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                </svg>
            </button>
        </div>
    )
}

export default HabitLog
