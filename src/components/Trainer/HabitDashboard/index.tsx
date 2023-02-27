import useUserContext from "@/context/UserState"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import { UserDialog } from "@/types/user"
import { getFrequencyString } from "@/utils/getFrequencyString"
import { Habit } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    habit: Habit
}

const HabitDashboard = ({ habit }: Props) => {
    const { data: program } = useGetProgram()
    const { toggleDialog } = useUserContext()

    const toggleDialogHandler =
        (prop: keyof UserDialog) =>
        (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
            toggleDialog(prop)

    if (!program) return <></>

    return (
        <>
            <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-2 grid-flow-row place-items-start place-content-start col-span-12 p-4 gap-4">
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4">
                    <div className="inline-flex items-center justify-start space-x-2">
                        <h3 className="text-xl font-bold">Habit Details</h3>
                        <button
                            type="button"
                            className="btn btn-sm btn-info"
                            onClick={toggleDialogHandler("editHabit")}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="grid grid-cols-1 grid-flow-row gap-2">
                        <label htmlFor="" className="text-sm">
                            Question:
                        </label>
                        <p className="font-semibold">{habit.message}</p>
                    </div>
                    <div className="grid grid-cols-1 grid-flow-row gap-2">
                        <label htmlFor="" className="text-sm">
                            Repeats:
                        </label>
                        <p className="font-semibold">
                            {getFrequencyString(
                                habit.frequency,
                                habit.repeatDay
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HabitDashboard
