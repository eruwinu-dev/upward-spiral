import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetWeek } from "@/hooks/date/useGetWeek"
import { HabitWithProgram } from "@/types/habit"
import { CompleteProgram } from "@/types/program"
import { UserDialog } from "@/types/user"
import React, { MouseEvent } from "react"
import WeekToggler from "../ProgramHabits/WeekToggler"

type Props = {
    program: CompleteProgram
    habit?: HabitWithProgram
    isCustom?: boolean
}

const UserTopBar = ({ program, habit, isCustom }: Props) => {
    const { toggleDialog } = useUserContext()
    const { push, role, week, pathname, render, renderPath, view } =
        usePageRender()

    const { data: info } = useGetWeek(new Date(program.startDate))

    const toggleDialogHandler =
        (prop: keyof UserDialog) =>
        (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
            toggleDialog(prop)

    const closeWindowHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if (habit) {
            push(
                {
                    pathname,
                    query:
                        render === "static"
                            ? { program: program.slug, week }
                            : {},
                },
                renderPath({ program: program.slug, week }),
                { shallow: true }
            )
        } else {
            push(
                {
                    pathname: `/${role.toLowerCase()}`,
                    query: {},
                },
                undefined,
                { shallow: true }
            )
        }
    }

    const goToProgramHandler = (event: MouseEvent<HTMLHeadingElement>) => {
        if (!program) return
        push(
            {
                pathname,
                query:
                    render === "static" ? { program: program.slug, week } : {},
            },
            renderPath({ program: program.slug, week }),
            { shallow: true }
        )
    }

    return (
        <div className="sticky top-0 left-0 min-h-[7vh] max-h-[7vh] grid grid-cols-3 grid-flow-row py-1 px-2 bg-base-300 col-span-12 z-[3]">
            <div className="inline-flex items-center justify-start w-full space-x-1">
                <h2
                    className="link link-hover text-lg font-semibold"
                    onClick={goToProgramHandler}
                >
                    {program.name}
                </h2>
                {habit && view ? (
                    <h2 className="text-lg">{`/ ${habit.title}`}</h2>
                ) : null}
            </div>
            <div></div>
            <div className="inline-flex items-center justify-end space-x-4">
                {!habit && info ? (
                    <WeekToggler
                        start={info.startDateString}
                        end={info.endDateString}
                    />
                ) : null}
                {habit && isCustom ? (
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            {Icons("vertical-dots")}
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 text-sm"
                        >
                            <>
                                <li>
                                    <a
                                        className="p-2"
                                        onClick={toggleDialogHandler(
                                            "deleteHabit"
                                        )}
                                    >
                                        Delete Habit
                                    </a>
                                </li>
                            </>
                        </ul>
                    </div>
                ) : null}
                <button
                    type="button"
                    className="btn btn-circle btn-ghost"
                    onClick={closeWindowHandler}
                >
                    {Icons("close")}
                </button>
            </div>
        </div>
    )
}

export default UserTopBar
