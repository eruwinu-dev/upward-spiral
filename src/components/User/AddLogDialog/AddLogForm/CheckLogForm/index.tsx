import useUserContext from "@/context/UserState"
import { useAddLog } from "@/hooks/log/useAddLog"
import { Habit } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    habit: Habit
}

const CheckLogForm = ({ habit }: Props) => {
    const { mutateAsync: mutateAddLog } = useAddLog()
    const {
        toggleDialog,
        toggleAction,
        action: { addLog: addLogAction },
    } = useUserContext()

    const addLogHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        toggleAction("addLog", "LOADING")
        const log = await mutateAddLog({
            message: `${habit.metric} --- ${true}`,
            habitId: habit.id,
        })
        if (!log) return
        toggleAction("addLog", "SUCCESS")
    }

    const closeCheckLog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleDialog("addLog")

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-4">
            <div className="grid grid-cols-1 grid-flow-row gap-2">
                <span className="text-sm font-semibold">Question</span>
                <p className="text-base">{habit.message}</p>
            </div>
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
