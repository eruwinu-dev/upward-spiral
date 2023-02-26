import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import React from "react"
import AddLogForm from "./AddLogForm"

type Props = {}

const AddLogDialog = (props: Props) => {
    const {
        dialog: { addLog: addLogDialog },
        action: { addLog: addLogAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const toggleDeleteProgramDialogHandler = () => {
        toggleDialog("addLog")
        setTimeout(() => toggleAction("addLog", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addLogDialog}
            closeOnBlur={addLogAction === "IDLE"}
            onClose={toggleDeleteProgramDialogHandler}
            title="Add Log"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {addLogAction !== "SUCCESS" ? (
                    <AddLogForm />
                ) : (
                    <div className="place-self-center">Added log!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default AddLogDialog
