import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useDeleteProgram } from "@/hooks/program/useDeleteProgram"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import React, { MouseEvent } from "react"

type Props = {}

const DeleteProgramDialog = (props: Props) => {
    const { push, pathname, render, renderPath } = usePageRender()
    const {
        dialog: { deleteProgram: deleteProgramDialog },
        action: { deleteProgram: deleteProgramAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const { data: program } = useGetProgram()
    const { mutateAsync: mutateDeleteProgram } = useDeleteProgram()

    const toggleDeleteProgramDialogHandler = () => {
        toggleDialog("deleteProgram")
        setTimeout(() => toggleAction("deleteProgram", "IDLE"), 500)
    }

    const deleteProgramHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!program) return
        toggleAction("deleteProgram", "LOADING")
        const count = await mutateDeleteProgram(program.slug)
        if (!count) return
        toggleAction("deleteProgram", "SUCCESS")
        setTimeout(() => {
            push(
                {
                    pathname,
                    query: {},
                },
                renderPath({}),
                { shallow: true }
            )
        }, 250)
    }

    return (
        <BaseDialog
            isOpen={deleteProgramDialog}
            closeOnBlur={deleteProgramAction !== "LOADING"}
            onClose={toggleDeleteProgramDialogHandler}
            title="Delete Program?"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {deleteProgramAction !== "SUCCESS" ? (
                    <>
                        <div>Delete this program?</div>
                        <div className="inline-flex items-center justify-end space-x-2">
                            <button
                                type="button"
                                className={[
                                    "btn btn-sm btn-error",
                                    deleteProgramAction === "LOADING"
                                        ? "loading"
                                        : "",
                                ].join(" ")}
                                onClick={deleteProgramHandler}
                                disabled={deleteProgramAction === "LOADING"}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-ghost"
                                onClick={toggleDeleteProgramDialogHandler}
                                disabled={deleteProgramAction === "LOADING"}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="place-self-center">Program deleted!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default DeleteProgramDialog
