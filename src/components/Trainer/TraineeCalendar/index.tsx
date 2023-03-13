import { GroupedHabit } from "@/types/habit"
import { User } from "@prisma/client"
import React from "react"

import { dayShorts } from "@/utils/dates"

type Props = {
    trainee: User
    groups: GroupedHabit[]
}

const TraineeCalendar = ({ trainee, groups }: Props) => {
    return (
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-12 grid-flow-row place-items-start place-content-start col-span-12 p-4 gap-4">
            <div className="col-span-5 w-full grid grid-cols-1 grid-flow-row gap-4 p-4 rounded-lg bg-base-200">
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
            <div className="col-span-7 w-full grid grid-cols-1 grid-flow-row gap-4 p-4 rounded-lg bg-base-200"></div>
            <div className="col-span-12 w-full grid grid-cols-5 grid-flow-row rounded-lg bg-base-200 h-full place-items-start place-content-start">
                <div className="w-full col-span-5 p-4 inline-flex items-center justify-between">
                    
                </div>
            </div>
        </div>
    )
}

export default TraineeCalendar
