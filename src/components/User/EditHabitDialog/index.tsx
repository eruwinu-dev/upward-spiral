import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import React from "react"
import HabitForm from "../HabitForm"

type Props = {}

const EditHabitDialog = (props: Props) => {
    const {
        dialog: { editHabit: editHabitDialog },
        action: { editHabit: editHabitAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const toggleeditHabitDialogHandler = () => {
        toggleDialog("editHabit")
        setTimeout(() => toggleAction("editHabit", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={editHabitDialog}
            onClose={toggleeditHabitDialogHandler}
            title="Edit Habit"
            size={editHabitAction !== "SUCCESS" ? "max-w-4xl" : "max-w-md"}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {editHabitAction !== "SUCCESS" ? (
                    <HabitForm form="edit" />
                ) : (
                    <div className="place-self-center p-4">Habit updated!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default EditHabitDialog
