import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/UserState"
import React from "react"
import AddTraineeForm from "./AddTraineeForm"

type Props = {}

const AddTraineeDialog = (props: Props) => {
    const {
        dialog: { addTrainee: addTraineeDialog },
        action: { addTrainee: addTraineeAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const toggleAddProgramDialogHandler = () => {
        toggleDialog("addTrainee")
        setTimeout(() => toggleAction("addTrainee", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addTraineeDialog}
            onClose={toggleAddProgramDialogHandler}
            title="Add Trainee"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4 p-4">
                {addTraineeAction === "IDLE" ? (
                    <AddTraineeForm />
                ) : addTraineeAction === "LOADING" ? (
                    <DialogSpinner text="Adding trainee to program..." />
                ) : (
                    <div className="place-self-center">Trainee added!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default AddTraineeDialog
