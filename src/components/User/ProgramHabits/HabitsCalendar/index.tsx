import useUserContext from "@/context/UserState"
import { GroupedHabit } from "@/types/habit"
import React, { MouseEvent } from "react"
import HabitCard from "./HabitCard"

type Props = {
    groups: GroupedHabit[]
}

const HabitsCalendar = ({ groups }: Props) => {
    const { toggleDialog } = useUserContext()

    const openAddHabitDialog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleDialog("addHabit")

    return (
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-1 grid-flow-row place-items-start place-content-start col-span-12 p-4 gap-4">
            <div className="w-full grid grid-cols-2 grid-flow-row place-content-between">
                <div className="inline-flex items-center justify-start space-x-2">
                    <h3 className="text-xl font-bold">Habits</h3>
                    <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={openAddHabitDialog}
                    >
                        Add
                    </button>
                </div>
            </div>
            {groups.map((group) => (
                <HabitCard key={group.id} group={group} />
            ))}
        </div>
    )
}

export default HabitsCalendar
