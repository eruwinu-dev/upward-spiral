import WeekToggler from "@/components/User/ProgramHabits/WeekToggler"
import { useGetWeek } from "@/hooks/date/useGetWeek"
import { GroupedHabit } from "@/types/habit"
import { CompleteProgram } from "@/types/program"
import { User } from "@prisma/client"
import React from "react"

import TraineeHabitCard from "./TraineeHabitCard"

type Props = {
    program: CompleteProgram
    trainee: User
    groups: GroupedHabit[]
}

const TraineeCalendar = ({ program, trainee, groups }: Props) => {
    const { data: info } = useGetWeek(program.startDate)

    return (
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-12 grid-flow-row place-items-start place-content-start col-span-12 p-4 gap-4">
            <div className="col-span-5 w-full grid grid-cols-1 grid-flow-row gap-4 p-4 rounded-lg bg-base-200/10 dark:bg-base-200">
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <h3 className="text-xl font-bold">Trainee Details</h3>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <label htmlFor="" className="text-sm break-words">
                        Name
                    </label>
                    <p className="font-semibold">{trainee.name}</p>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <label htmlFor="" className="text-sm">
                        Email
                    </label>
                    <p className="font-semibold break-all">{trainee.email}</p>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <label htmlFor="" className="text-sm">
                        Timezone
                    </label>
                    <p className="font-semibold">
                        {trainee.timezone.replace(/_/g, " ")}
                    </p>
                </div>
            </div>
            <div className="col-span-7 w-full grid grid-cols-1 grid-flow-row gap-4 p-4 rounded-lg"></div>
            <div className="col-span-12 w-full p-4 grid grid-cols-1 gap-4 grid-flow-row rounded-lg dark:bg-base-200 h-full place-items-start place-content-start">
                <div className="w-full inline-flex items-center justify-between">
                    <h3 className="text-xl font-bold">Habits</h3>
                    {info ? (
                        <WeekToggler
                            start={info.startDateString}
                            end={info.endDateString}
                        />
                    ) : null}
                </div>
                {groups.map((group) => (
                    <TraineeHabitCard key={group.id} group={group} />
                ))}
            </div>
        </div>
    )
}

export default TraineeCalendar
