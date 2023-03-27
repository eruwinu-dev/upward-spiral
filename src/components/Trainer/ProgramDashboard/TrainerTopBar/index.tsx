import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { HabitWithProgram } from "@/types/habit"
import { CompleteProgram } from "@/types/program"
import { UserDialog } from "@/types/user"
import { User } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    program: CompleteProgram
    habit?: HabitWithProgram
    trainee?: User
}

const TrainerTopBar = ({ program, habit, trainee }: Props) => {
    const { toggleDialog } = useUserContext()
    const { push, pathname, render, renderPath } = usePageRender()

    const toggleDialogHandler =
        (prop: keyof UserDialog) =>
        (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
            toggleDialog(prop)

    const closeWindowHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if (!program) return
        if (habit || trainee)
            push(
                {
                    pathname,
                    query: render === "static" ? { program: program.slug } : {},
                },
                renderPath({ program: program.slug }),
                { shallow: true }
            )
        else
            push(
                {
                    pathname: "/trainer",
                    query: {},
                },
                undefined,
                { shallow: true }
            )
    }

    const goToProgramHandler = (event: MouseEvent<HTMLHeadingElement>) => {
        if (!program) return
        push(
            {
                pathname,
                query: render === "static" ? { program: program.slug } : {},
            },
            renderPath({ program: program.slug }),
            { shallow: true }
        )
    }

    return (
        <div className="sticky top-0 left-0 min-h-[7vh] max-h-[7vh] grid grid-cols-2 grid-flow-row py-1 px-2 bg-base-300 col-span-12">
            <div className="inline-flex items-center justify-start w-full space-x-1">
                <h2
                    className="link link-hover text-lg font-semibold"
                    onClick={goToProgramHandler}
                >
                    {program.name}
                </h2>
                {habit ? (
                    <h2 className="text-lg">{`/ ${habit.title}`}</h2>
                ) : null}
                {trainee ? (
                    <h2 className="text-lg">{`/ ${trainee.name}`}</h2>
                ) : null}
            </div>
            <div className="inline-flex items-center justify-end space-x-2 relative">
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        {Icons("vertical-dots")}
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 dark:bg-base-200 rounded-box w-52 text-sm"
                    >
                        {habit ? (
                            <>
                                <li>
                                    <a
                                        className="focus:bg-base-200"
                                        onClick={toggleDialogHandler(
                                            "editHabit"
                                        )}
                                    >
                                        Edit Habit
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="focus:bg-base-200"
                                        onClick={toggleDialogHandler(
                                            "deleteHabit"
                                        )}
                                    >
                                        Delete Habit
                                    </a>
                                </li>
                            </>
                        ) : trainee ? (
                            <>
                                <li>
                                    <a
                                        className="focus:bg-base-200"
                                        onClick={toggleDialogHandler(
                                            "deleteTrainee"
                                        )}
                                    >
                                        Remove Trainee
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a
                                        className="focus:bg-base-200"
                                        onClick={toggleDialogHandler(
                                            "editProgram"
                                        )}
                                    >
                                        Edit Program
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="focus:bg-base-200"
                                        onClick={toggleDialogHandler(
                                            "deleteProgram"
                                        )}
                                    >
                                        Delete Program
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
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

export default TrainerTopBar
