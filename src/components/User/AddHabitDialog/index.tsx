import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import React from "react"
import AddHabitForm from "./AddHabitForm"

type Props = {
}

const AddHabitDialog = (props: Props) => {
    const {
        dialog: { addHabit: addHabitDialog },
        action: { addHabit: addHabitAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const toggleaddHabitDialogHandler = () => {
        toggleDialog("addHabit")
        setTimeout(() => toggleAction("addHabit", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addHabitDialog}
            onClose={toggleaddHabitDialogHandler}
            title="Add Custom Habit"
            size={addHabitAction !== "SUCCESS" ? "max-w-4xl" : "max-w-md"}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {addHabitAction !== "SUCCESS" ? (
                    <AddHabitForm />
                ) : (
                    <div className="place-self-center p-4">Habit added!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default AddHabitDialog