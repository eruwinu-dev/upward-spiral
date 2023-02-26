import useUserContext from "@/context/UserState"
import { CompleteHabit } from "@/types/habit"
import React from "react"

import { daysOfWeek } from "@/utils/dates"
import HabitLog from "./HabitLog"

type Props = {
    habits: CompleteHabit[]
}

const HabitCard = ({ habits }: Props) => {
    const { programView } = useUserContext()

    const habitType = habits[0].habitType

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-4 place-items-center">
            <h3 className="text-xl font-bold">
                {habitType?.title || "Custom Habits"}
            </h3>
            {programView === "DAILY" ? (
                <div>Daily View</div>
            ) : (
                <table className="table table-auto w-full text-xs">
                    <thead>
                        <tr>
                            <td>Habit</td>
                            {daysOfWeek.map((day) => (
                                <td key={day} className="text-center">
                                    {day}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map((habit) => (
                            <tr key={habit.id}>
                                <td>
                                    <p className="text-wrap">{habit.message}</p>
                                </td>
                                {daysOfWeek.map((day, index) => (
                                    <td key={day} className="text-center">
                                        <HabitLog habit={habit} day={index} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default HabitCard
