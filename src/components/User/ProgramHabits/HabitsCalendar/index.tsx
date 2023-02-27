import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { GroupedHabit } from "@/types/habit"
import React, { MouseEvent } from "react"
import HabitCard from "./HabitCard"

type Props = {
    groups: GroupedHabit[]
}

const HabitsCalendar = ({ groups }: Props) => {
    const {
        push,
        render,
        renderPath,
        program,
        week: weekString,
        pathname,
    } = usePageRender()
    const { toggleDialog } = useUserContext()

    const week = Number(weekString || 0)

    const openAddHabitDialog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleDialog("addHabit")

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
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-1 grid-flow-row place-items-start place-content-start col-span-12 p-4 gap-4">
            <div className="w-full grid grid-cols-2 grid-flow-row place-content-between">
                <div className="inline-flex items-center justify-start space-x-2">
                    <h3 className="text-xl font-bold">Habits</h3>
                    <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={openAddHabitDialog}
                    >
                        Add
                    </button>
                </div>
                <div className="inline-flex items-center justify-end space-x-2">
                    <h3 className="text-lg font-semibold">{`Week ${week}`}</h3>
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
            </div>
            {groups.map((group) => (
                <HabitCard key={group.id} group={group} />
            ))}
        </div>
    )
}

export default HabitsCalendar
