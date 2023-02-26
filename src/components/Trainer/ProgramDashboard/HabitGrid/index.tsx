import useUserContext from "@/context/UserState"
import { GroupedHabit } from "@/types/habit"
import React, { MouseEvent } from "react"
import HabitGridGroup from "./HabitGridGroup"

type Props = {
    groups: GroupedHabit[]
}

const HabitGrid = ({ groups }: Props) => {
    const { toggleDialog } = useUserContext()

    const openAddHabitDialog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleDialog("addHabit")

    return (
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-1 grid-flow-row place-items-start place-content-start col-span-7 p-4 gap-4">
            <div className="w-full inline-flex items-center justify-start space-x-2">
                <h3 className="text-xl font-bold">Habits</h3>
                <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={openAddHabitDialog}
                >
                    Add
                </button>
            </div>
            {groups.map((group) => (
                <HabitGridGroup key={group.id} group={group} />
            ))}
        </div>
    )
}

export default HabitGrid
