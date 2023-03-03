import useUserContext from "@/context/UserState"
import { useGetHabit } from "@/hooks/habit/useGetHabit"
import { addLog, useAddLog } from "@/hooks/log/useAddLog"
import React, { MouseEvent } from "react"

type Props = {}

const CheckLogForm = (props: Props) => {
    const { data: habit } = useGetHabit()
    const { mutateAsync: mutateAddLog } = useAddLog()
    const {
        toggleDialog,
        toggleAction,
        action: { addLog: addLogAction },
    } = useUserContext()

    const addLogHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!habit) return
        toggleAction("addLog", "LOADING")
        const log = await mutateAddLog({ message: "", habitId: habit.id })
        if (!log) return
        toggleAction("addLog", "SUCCESS")
    }

    const closeCheckLog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleDialog("addLog")

    if (!habit) return <></>

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-4">
            <p className="text-base">{habit.message}</p>
            <div className="inline-flex items-center justify-end space-x-2">
                <button
                    type="button"
                    className={[
                        "btn btn-sm btn-success",
                        addLogAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                    disabled={addLogAction === "LOADING"}
                    onClick={addLogHandler}
                >
                    Yes, Log this
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={closeCheckLog}
                    disabled={addLogAction === "LOADING"}
                >
                    Not yet
                </button>
            </div>
        </div>
    )
}

export default CheckLogForm
