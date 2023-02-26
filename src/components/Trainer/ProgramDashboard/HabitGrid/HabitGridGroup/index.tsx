import { GroupedHabit } from "@/types/habit"
import React from "react"
import HabitGridGroupItem from "./HabitGridGroupItem"

type Props = {
    group: GroupedHabit
}

const HabitGridGroup = ({ group: { title, habits } }: Props) => {
    return (
        <div className="w-full grid grid-cols-1 grid-flow-row gap-4 rounded-lg bg-white p-4">
            <div>
                <h2 className="text-lg font-bold text-success-content">
                    {title}
                </h2>
            </div>
            <div className="w-full grid grid-cols-3 grid-flow-row gap-4">
                {habits.map((habit) => (
                    <HabitGridGroupItem key={habit.id} habit={habit} />
                ))}
            </div>
        </div>
    )
}

export default HabitGridGroup