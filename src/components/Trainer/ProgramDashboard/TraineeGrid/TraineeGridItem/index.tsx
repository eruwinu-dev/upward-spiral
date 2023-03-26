import { usePageRender } from "@/hooks/custom/usePageRender"
import { useUpdateDateInfo } from "@/hooks/date/useUpdateDateInfo"
import { User } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    trainee: User
    startDate: Date
}

const TraineeGridItem = ({ trainee: { name, id }, startDate }: Props) => {
    const { render, renderPath, program, push, pathname } = usePageRender()
    const { mutateAsync: mutateUpdateDate } = useUpdateDateInfo()

    const viewTraineeHandler = async (event: MouseEvent<HTMLDivElement>) => {
        if (!program) return
        const { week } = await mutateUpdateDate(program)
        push(
            {
                pathname,
                query:
                    render === "static"
                        ? {
                              program,
                              trainee: id,
                              week: week,
                              day: 1,
                              view: "trainee",
                          }
                        : {},
            },
            renderPath({
                program,
                trainee: id,
                week: String(week),
                day: String(1),
                view: "trainee",
            }),
            { shallow: true }
        )
    }

    return (
        <div
            className="w-full p-2 hover:bg-base-200 inline-flex items-center justify-between rounded-lg cursor-pointer"
            onClick={viewTraineeHandler}
        >
            <span className="text-sm">{name}</span>
        </div>
    )
}

export default TraineeGridItem
