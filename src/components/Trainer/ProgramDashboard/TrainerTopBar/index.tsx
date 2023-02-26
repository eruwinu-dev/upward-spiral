import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { CompleteProgram } from "@/types/program"
import { UserDialog } from "@/types/user"
import { Habit } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    program: CompleteProgram
    habit?: Habit
}

const TrainerTopBar = ({ program, habit }: Props) => {
    const { toggleDialog } = useUserContext()
    const { push, pathname, render, renderPath } = usePageRender()

    const toggleDialogHandler =
        (prop: keyof UserDialog) =>
        (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
            toggleDialog(prop)

    const closeWindowHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if (!program) return
        if (habit)
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
                    pathname,
                    query: {},
                },
                renderPath({}),
                { shallow: true }
            )
    }

    return (
        <div className="sticky top-0 left-0 min-h-[7vh] max-h-[7vh] grid grid-cols-3 grid-flow-row py-1 px-2 bg-white col-span-12">
            <div className="inline-flex items-center justify-start w-full space-x-1">
                <h2 className="text-lg font-semibold">{program.name}</h2>
                {habit ? (
                    <h2 className="text-lg">{`/ ${habit.title}`}</h2>
                ) : null}
            </div>
            <div></div>
            <div className="inline-flex items-center justify-end space-x-2 relative">
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        {Icons("vertical-dots")}
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 text-sm"
                    >
                        {habit ? (
                            <li>
                                <a
                                    className="focus:bg-white"
                                    onClick={toggleDialogHandler("deleteHabit")}
                                >
                                    Delete Habit
                                </a>
                            </li>
                        ) : (
                            <li>
                                <a
                                    className="focus:bg-white"
                                    onClick={toggleDialogHandler(
                                        "deleteProgram"
                                    )}
                                >
                                    Delete Program
                                </a>
                            </li>
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
