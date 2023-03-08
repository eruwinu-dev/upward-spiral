import { Icons } from "@/components/Icons"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetLogsByWeek } from "@/hooks/log/useGetLogsByWeek"
import { HabitWithProgram } from "@/types/habit"
import { getCompletion } from "@/utils/completion"
import { range } from "@/utils/range"
import React, { MouseEvent } from "react"
import HabitLog from "./HabitLog"

type Props = {
    habit: HabitWithProgram
}

const HabitRow = ({ habit }: Props) => {
    const { program, week, render, renderPath, push, pathname } =
        usePageRender()
    const { data: logs } = useGetLogsByWeek(habit)

    const completion = logs
        ? getCompletion({
              count: logs.filter((log) => log.log).length,
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
                              week,
                              day: 1,
                              view: "habit",
                          }
                        : {},
            },
            renderPath({
                program,
                habit: habit.slug,
                week,
                day: "1",
                view: "habit",
            }),
            { shallow: true }
        )
    }

    return (
        <>
            <tr>
                <td>
                    <p
                        className="text-wrap link link-hover"
                        onClick={openHabitViewBoxHandler}
                    >
                        {habit.message}
                    </p>
                </td>
                {logs
                    ? logs.map((log, index) => (
                          <td key={index} className="text-center">
                              <HabitLog
                                  habit={habit}
                                  dayNumber={index + 1}
                                  sortedLog={log}
                              />
                          </td>
                      ))
                    : range(1, 8).map((index) => (
                          <td key={index}>
                              <div className="inline-flex items-center justify-center">
                                  <span className="btn btn-sm btn-square opacity-0">
                                      {Icons("square")}
                                  </span>
                              </div>
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
        </>
    )
}

export default HabitRow
