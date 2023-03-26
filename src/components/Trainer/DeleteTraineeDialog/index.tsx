import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useDeleteTrainee } from "@/hooks/trainee/useDeleteTrainee"
import React, { MouseEvent } from "react"

type Props = {}

const DeleteTraineeDialog = (props: Props) => {
    const {
        dialog: { deleteTrainee: deleteTraineeDialog },
        action: { deleteTrainee: deleteTraineeAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const { trainee } = usePageRender()

    const { mutateAsync: mutateDeleteTrainee } = useDeleteTrainee()

    const toggleAddProgramDialogHandler = () => {
        toggleDialog("deleteTrainee")
        setTimeout(() => toggleAction("deleteTrainee", "IDLE"), 500)
    }

    const deleteTraineeHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!trainee) return
        toggleAction("deleteTrainee", "LOADING")
        const count = await mutateDeleteTrainee(trainee)
        if (!count) return
        toggleAction("deleteTrainee", "SUCCESS")
    }

    return (
        <BaseDialog
            isOpen={deleteTraineeDialog}
            onClose={toggleAddProgramDialogHandler}
            title="Remove Trainee"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4 py-2">
                {deleteTraineeAction !== "SUCCESS" ? (
                    trainee ? (
                        <>
                            <span className="text-justify">
                                Once this trainee is removed from this program,
                                all logs made by the trainee will be removed.
                            </span>
                            <div className="w-full inline-flex items-center justify-end space-x-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-ghost"
                                    onClick={toggleAddProgramDialogHandler}
                                    disabled={deleteTraineeAction === "LOADING"}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className={[
                                        "btn btn-sm btn-outline btn-error",
                                        deleteTraineeAction === "LOADING"
                                            ? "loading"
                                            : "",
                                    ].join(" ")}
                                    onClick={deleteTraineeHandler}
                                    disabled={deleteTraineeAction === "LOADING"}
                                >
                                    Remove
                                </button>
                            </div>
                        </>
                    ) : null
                ) : (
                    <div className="place-self-center">
                        Trainee removed from program!
                    </div>
                )}
            </div>
        </BaseDialog>
    )
}

export default DeleteTraineeDialog
