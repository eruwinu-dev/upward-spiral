import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { HabitLogSlot } from "@/types/log"
import React, { MouseEvent } from "react"
import HabitViewLogAnswer from "./HabitViewLogAnswer"

type Props = {
    slots: HabitLogSlot[]
}

const HabitViewLogs = ({ slots }: Props) => {
    const { toggleDialog } = useUserContext()

    const { push, pathname, program, render, view, habit, renderPath } =
        usePageRender()

    const openViewLogDialogHandler =
        ({ week, day }: HabitLogSlot) =>
        (event: MouseEvent<HTMLSpanElement>) => {
            toggleDialog("viewLog")
            push(
                {
                    pathname,
                    query:
                        render === "static"
                            ? {
                                  program,
                                  week,
                                  day,
                                  habit,
                                  view,
                              }
                            : {},
                },
                renderPath({
                    program,
                    week: String(week),
                    day: String(day),
                    habit,
                    view,
                }),
                { shallow: true }
            )
        }

    return (
        <table className="table table-auto text-center text-sm">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Status</td>
                    <td>Log</td>
                </tr>
            </thead>
            <tbody>
                {slots.map((slot, index) => (
                    <tr key={index} className="hover">
                        <td
                            onClick={openViewLogDialogHandler(slot)}
                            className="link link-hover"
                        >
                            <span>{slot.dateString}</span>
                        </td>
                        <td
                            className={[
                                slot.log
                                    ? "text-success"
                                    : slot.isToday
                                    ? ""
                                    : slot.isLapsed
                                    ? "text-error"
                                    : "",
                                "font-bold",
                            ].join(" ")}
                        >
                            {slot.log
                                ? "Accomplished"
                                : slot.isToday
                                ? "To Answer"
                                : slot.isLapsed
                                ? "Lapsed"
                                : null}
                        </td>
                        <td>
                            {slot.log ? (
                                <HabitViewLogAnswer
                                    message={slot.log.message}
                                />
                            ) : null}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default HabitViewLogs
