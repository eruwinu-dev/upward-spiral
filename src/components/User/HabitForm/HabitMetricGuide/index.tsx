import { HabitMetric } from "@prisma/client"
import React from "react"

type Props = {
    metric: HabitMetric
}

const HabitMetricGuide = ({ metric }: Props) => {
    return (
        <div className="text-sm pt-4">
            {metric === "CHECK" ? (
                <span>
                    A habit with a <span className="font-semibold">check</span>{" "}
                    metric just asks for a check.
                </span>
            ) : metric === "MESSAGE" ? (
                <span>
                    A habit with a{" "}
                    <span className="font-semibold">message</span> metric asks
                    for a sentence/paragraph to answer the habit question.
                </span>
            ) : metric === "NUMBER" ? (
                <span>
                    A habit with a <span className="font-semibold">number</span>{" "}
                    metric asks for a number to answer the habit question.
                </span>
            ) : metric === "RATING" ? (
                <span>
                    A habit with a <span className="font-semibold">rating</span>{" "}
                    metric asks for a rating depending on the number of stars,
                    with 1 being the lowest and 5 being the highest.
                </span>
            ) : (
                <span>
                    A metric tells the trainee how a habit will be logged.
                </span>
            )}
        </div>
    )
}

export default HabitMetricGuide
