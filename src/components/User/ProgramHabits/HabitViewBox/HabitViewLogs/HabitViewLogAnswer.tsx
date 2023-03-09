import { range } from "@/utils/range"
import { HabitMetric } from "@prisma/client"
import React from "react"

type Props = {
    message: string
}

const HabitViewLogAnswer = ({ message }: Props) => {
    const [type, answer] = message.split(" --- ") as [HabitMetric, string]

    return (
        <div className="inline-flex items-center justify-center space-x-4">
            {type === "CHECK" ? null : type === "MESSAGE" ||
              type === "NUMBER" ? (
                <span>{answer}</span>
            ) : type === "RATING" ? (
                <div className="rating rating-md">
                    {range(1, Number(answer) + 1).map((star) => (
                        <input
                            key={star}
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2 bg-yellow-500"
                            disabled
                            checked
                            readOnly
                        />
                    ))}
                    {range(1, 6 - Number(answer)).map((star) => (
                        <input
                            key={star}
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2"
                            disabled
                            checked
                            readOnly
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default HabitViewLogAnswer
