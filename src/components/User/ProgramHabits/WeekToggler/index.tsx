import { Icons } from "@/components/Icons"
import { usePageRender } from "@/hooks/custom/usePageRender"
import React, { MouseEvent } from "react"

type Props = {
    start: string
    end: string
}

const WeekToggler = ({ start, end }: Props) => {
    const {
        push,
        render,
        renderPath,
        program,
        week: weekString,
        pathname,
    } = usePageRender()

    const week = weekString ? Number(weekString) : 0

    const toggleWeekHandler =
        (direction: -1 | 1) => (event: MouseEvent<HTMLButtonElement>) => {
            const newWeek = week + direction
            push(
                {
                    pathname,
                    query:
                        render === "static" ? { program, week: newWeek } : {},
                },
                renderPath({ program, week: String(newWeek) }),
                { shallow: true }
            )
        }

    return (
        <div className="inline-flex items-center justify-end space-x-4">
            <div
                className="tooltip tooltip-bottom cursor-pointer"
                data-tip={`${start} to ${end}`}
            >
                <h3 className="text-md font-semibold">{`Week ${week}`}</h3>
            </div>
            <div className="btn-group">
                <button
                    className="btn btn-sm btn-ghost btn-square"
                    onClick={toggleWeekHandler(-1)}
                    disabled={week === 1}
                >
                    {Icons("chevron-left")}
                </button>
                <button
                    className="btn btn-sm btn-ghost btn-square"
                    onClick={toggleWeekHandler(1)}
                    disabled={week === 15}
                >
                    {Icons("chevron-right")}
                </button>
            </div>
        </div>
    )
}

export default WeekToggler
