import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import React from "react"
import AddProgramForm from "./AddProgramForm"

type Props = {}

const AddProgramDialog = (props: Props) => {
    const {
        dialog: { addProgram: addProgramDialog },
        action: { addProgram: addProgramAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const toggleAddProgramDialogHandler = () => {
        toggleDialog("addProgram")
        setTimeout(() => toggleAction("addProgram", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addProgramDialog}
            onClose={toggleAddProgramDialogHandler}
            title="Add Program"
            size={addProgramAction === "SUCCESS" ? "max-w-md" : "max-w-3xl"}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {addProgramAction !== "SUCCESS" ? (
                    <AddProgramForm />
                ) : (
                    <div className="place-self-center">Program added!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default AddProgramDialog
