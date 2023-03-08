import { SimpleLog } from "@/types/log"
import { range } from "@/utils/range"
import { HabitMetric } from "@prisma/client"
import React from "react"

type Props = {
    log: SimpleLog
}

const LogAnswer = ({ log: { message, createdAt } }: Props) => {
    const [type, answer] = message.split(" --- ") as [HabitMetric, string]

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-2">
            <div>
                <span className="text-sm font-semibold">
                    {type === "CHECK"
                        ? "Status"
                        : type === "MESSAGE"
                        ? "Answer"
                        : "Score"}
                </span>
            </div>
            {type === "CHECK" ? (
                <div className="inline-flex itmes-center justify-start space-x-2">
                    <span className="badge badge-lg badge-success font-semibold">
                        Accomplished
                    </span>
                </div>
            ) : type === "NUMBER" || type === "MESSAGE" ? (
                <div>
                    <span>{answer}</span>
                </div>
            ) : (
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
            )}
            <div className="inline-flex items-center justify-end">
                <span className="text-sm">{`Logged on ${createdAt}`}</span>
            </div>
        </div>
    )
}

export default LogAnswer
