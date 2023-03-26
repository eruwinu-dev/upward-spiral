import { GroupedHabit } from "@/types/habit"
import { dayShorts } from "@/utils/dates"
import React from "react"
import TraineeHabitRow from "./TraineeHabitRow"

type Props = {
    group: GroupedHabit
}

const TraineeHabitCard = ({ group: { title, habits } }: Props) => {
    return (
        <div className="w-full grid grid-cols-1 grid-flow-row gap-4 rounded-lg bg-base-300 p-4">
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            {habits.length ? (
                <table className="table table-auto w-full text-xs">
                    <thead>
                        <tr>
                            <td>Habit</td>
                            {dayShorts.map((day) => (
                                <td key={day} className="text-center">
                                    {day}
                                </td>
                            ))}
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map((habit) => (
                            <TraineeHabitRow habit={habit} key={habit.id} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No habits.</div>
            )}
        </div>
    )
}

export default TraineeHabitCard
