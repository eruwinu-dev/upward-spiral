import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetLogsByTrainee } from "@/hooks/log/useGetLogsByTrainee"
import { HabitWithProgram } from "@/types/habit"
import { getCompletion } from "@/utils/completion"
import { range } from "@/utils/range"
import React, { MouseEvent } from "react"
import TraineeHabitLog from "./TraineeHabitLog"

type Props = {
    habit: HabitWithProgram
}

const TraineeHabitRow = ({ habit }: Props) => {
    const { program, week, render, renderPath, push, pathname } =
        usePageRender()
    const { data: slots } = useGetLogsByTrainee(habit)

    const completion = slots
        ? getCompletion({
              count: slots.filter((log) => log.log).length,
              week: Number(week) as number,
              frequency: habit.frequency,
              duration: habit.duration as number | undefined,
          })
        : undefined

    const openHabitViewBoxHandler = (event: MouseEvent<HTMLDivElement>) => {
        push(
            {
                pathname,
                query:
                    render === "static"
                        ? {
                              program,
                              habit: habit.slug,
                          }
                        : {},
            },
            renderPath({
                program,
                habit: habit.slug,
            }),
            { shallow: true }
        )
    }

    return (
        <tr className="hover">
            <td>
                <p
                    className="text-wrap link link-hover"
                    onClick={openHabitViewBoxHandler}
                >
                    {habit.message}
                </p>
            </td>
            {slots
                ? slots.map((slot, index) => (
                      <td key={index} className="text-center">
                          <TraineeHabitLog slug={habit.slug} slot={slot} />
                      </td>
                  ))
                : range(1, 8).map((slot) => (
                      <td key={slot} className="text-center">
                          <button
                              type="button"
                              disabled={true}
                              className="btn btn-sm btn-ghost btn-square loading"
                          />
                      </td>
                  ))}
            <td>
                <span className="font-semibold">
                    {typeof completion !== "undefined"
                        ? `${completion.toFixed(2)} %`
                        : ""}
                </span>
            </td>
        </tr>
    )
}

export default TraineeHabitRow
