import { usePageRender } from "@/hooks/custom/usePageRender"
import { User } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    trainee: User
}

const TraineeGridItem = ({ trainee: { name, id } }: Props) => {
    const { render, renderPath, program, push, pathname } = usePageRender()

    const viewTraineeHandler = (event: MouseEvent<HTMLDivElement>) => {
        push(
            {
                pathname,
                query:
                    render === "static"
                        ? {
                              program,
                              trainee: id,
                              week: 1,
                              day: 1,
                              view: "trainee",
                          }
                        : {},
            },
            renderPath({
                program,
                trainee: id,
                week: String(1),
                day: "1",
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
