import { Icons } from "@/components/Icons"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { HabitWithProgram } from "@/types/habit"
import { getFrequencyString } from "@/utils/getFrequencyString"
import { HabitMetric } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    habit: HabitWithProgram
}

const metricIcons = new Map<HabitMetric, string>([
    ["RATING", "stars"],
    ["NUMBER", "number"],
    ["MESSAGE", "text"],
    ["CHECK", "check"],
])

const HabitGridGroupItem = ({ habit }: Props) => {
    const { program, pathname, render, push, renderPath } = usePageRender()

    const openHabitHandler = (event: MouseEvent<HTMLDivElement>) => {
        push(
            {
                pathname,
                query:
                    render === "static" ? { program, habit: habit.slug } : {},
            },
            renderPath({ program, habit: habit.slug }),
            { shallow: true }
        )
    }

    return (
        <div
            className="w-full aspect-video p-4 rounded-lg border-2 drop-shadow-lg border-primary/50 hover:border-primary cursor-pointer grid grid-cols-1 grid-flow-row place-content-between gap-2"
            onClick={openHabitHandler}
        >
            <div className="inline-flex items-center">
                <span className="text-xs">{habit.title}</span>
            </div>
            <div>
                <span className="text-sm font-semibold">{habit.message}</span>
            </div>
            <div className="inline-flex items-center justify-between">
                <span className="text-xs">
                    {getFrequencyString(habit.frequency, habit.repeatDay)}
                </span>
                <span>{Icons(metricIcons.get(habit.metric))}</span>
            </div>
        </div>
    )
}

export default HabitGridGroupItem
