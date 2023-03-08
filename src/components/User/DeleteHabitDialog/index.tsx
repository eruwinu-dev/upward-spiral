import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useDeleteHabit } from "@/hooks/habit/useDeleteHabit"
import React, { MouseEvent } from "react"

type Props = {}

const DeleteHabitDialog = (props: Props) => {
    const { role, week, push, habit, pathname, render, program, renderPath } =
        usePageRender()
    const {
        dialog: { deleteHabit: deleteHabitDialog },
        action: { deleteHabit: deleteHabitAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const { mutateAsync: mutateDeleteHabit } = useDeleteHabit()

    const toggleDeleteProgramDialogHandler = () => {
        toggleDialog("deleteHabit")
        setTimeout(() => toggleAction("deleteHabit", "IDLE"), 500)
    }

    const deleteHabitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!habit) return
        toggleAction("deleteHabit", "LOADING")
        const count = await mutateDeleteHabit(habit)
        if (!count) return
        toggleAction("deleteHabit", "SUCCESS")
        setTimeout(() => {
            push(
                {
                    pathname,
                    query:
                        render === "static"
                            ? role === "USER"
                                ? { program, week }
                                : { program }
                            : {},
                },
                renderPath(role === "USER" ? { program, week } : { program }),
                { shallow: true }
            )
        }, 250)
    }

    return (
        <BaseDialog
            isOpen={deleteHabitDialog}
            closeOnBlur={deleteHabitAction !== "LOADING"}
            onClose={toggleDeleteProgramDialogHandler}
            title="Delete Habit?"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {deleteHabitAction !== "SUCCESS" ? (
                    <>
                        <div>Delete this habit?</div>
                        <div className="inline-flex items-center justify-end space-x-2">
                            <button
                                type="button"
                                className={[
                                    "btn btn-sm btn-error",
                                    deleteHabitAction === "LOADING"
                                        ? "loading"
                                        : "",
                                ].join(" ")}
                                onClick={deleteHabitHandler}
                                disabled={deleteHabitAction === "LOADING"}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-ghost"
                                onClick={toggleDeleteProgramDialogHandler}
                                disabled={deleteHabitAction === "LOADING"}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="place-self-center">Habit deleted!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default DeleteHabitDialog
