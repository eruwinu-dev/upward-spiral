import { useGetLogs } from "@/hooks/log/useGetLogs"
import { HabitWithProgram } from "@/types/habit"
import { daysOfWeek } from "@/utils/dates"
import React from "react"
import HabitLog from "./HabitLog"

type Props = {
    habit: HabitWithProgram
}

const HabitRow = ({ habit }: Props) => {
    const { data: logs } = useGetLogs(habit)

    if (!logs) return <></>

    return (
        <>
            <tr>
                <td>
                    <p className="text-wrap">{habit.message}</p>
                </td>
                {logs.map((log, index) => (
                    <td key={index} className="text-center">
                        <HabitLog
                            habit={habit}
                            dayNumber={index + 1}
                            sortedLog={log}
                        />
                    </td>
                ))}
            </tr>
        </>
    )
}

export default HabitRow
