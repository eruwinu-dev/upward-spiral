import { StatusLog } from "@/types/log"
import React from "react"
import HabitViewLogAnswer from "./HabitViewLogAnswer"

type Props = {
    logs: StatusLog[]
}

const HabitViewLogs = ({ logs }: Props) => {
    return (
        <table className="table table-auto text-center text-sm">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Status</td>
                    <td>Log</td>
                </tr>
            </thead>
            <tbody>
                {logs.map((log, index) => (
                    <tr key={index}>
                        <td>{log.dateString}</td>
                        <td
                            className={[
                                log.log
                                    ? "text-success"
                                    : log.isToday
                                    ? "text-content"
                                    : "text-error",
                                "font-semibold",
                            ].join(" ")}
                        >
                            {log.log
                                ? "Completed"
                                : log.isToday
                                ? "To Answer"
                                : "Lapsed"}
                        </td>
                        <td>
                            {log.log ? (
                                <HabitViewLogAnswer message={log.log.message} />
                            ) : null}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default HabitViewLogs
