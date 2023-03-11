import Spinner from "@/components/Spinner"
import { useGetLogsByHabit } from "@/hooks/log/useGetLogsByHabit"
import { HabitWithProgram } from "@/types/habit"
import { capitalize } from "@/utils/capitalize"
import { getFrequencyString } from "@/utils/getFrequencyString"
import React from "react"
import HabitProgress from "./HabitProgress"
import HabitViewLogs from "./HabitViewLogs"

type Props = {
    habit: HabitWithProgram
    isCustom: boolean
}

const HabitViewBox = ({ habit }: Props) => {
    const { data: info, isLoading } = useGetLogsByHabit(habit)

    if (!info || isLoading)
        return (
            <div className="min-h-[93vh] max-h-[93vh] col-span-12 inline-flex items-center justify-center">
                <Spinner />
            </div>
        )

    return (
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-12 grid-flow-row place-items-start place-content-start col-span-12 p-4 gap-8">
            <div className="grid grid-cols-1 col-span-6 gap-4 p-4 rounded-lg bg-base-300 w-full">
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <span className="text-sm font-semibold">Question</span>
                    <span className="text-lg">{habit.message}</span>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <span className="text-sm font-semibold">Metric</span>
                    <span className="">
                        {capitalize(habit.metric.toLowerCase())}
                    </span>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <span className="text-sm font-semibold">Repeats</span>
                    <span className="">
                        {getFrequencyString(habit.frequency, habit.repeatDay)}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-6 p-4 rounded-lg bg-base-300 w-full">
                <HabitProgress info={info} />
            </div>
            <div className="grid grid-cols-1 gap-4 col-span-12 p-4 rounded-lg bg-base-300 w-full">
                <span className="text-lg font-semibold">Logs</span>
                <HabitViewLogs slots={info.slots} />
            </div>
        </div>
    )
}

export default HabitViewBox
