import Spinner from "@/components/Spinner"
import { useGetHabit } from "@/hooks/habit/useGetHabit"
import React from "react"
import CheckLogForm from "./CheckLogForm"
import MessageLogForm from "./MessageLogForm"
import NumberLogForm from "./NumberLogForm"
import RatingLogForm from "./RatingLogForm"

type Props = {}

const AddLogForm = (props: Props) => {
    const { data: habit, isLoading } = useGetHabit()

    if (isLoading) {
        return (
            <div className="inline-flex items-center justify-center p-4">
                <Spinner />
            </div>
        )
    }

    if (!habit) return <></>

    return (
        <>
            <div className="text-sm">
                <span>Habit: </span>
                <span className="font-semibold">{` ${habit.title}`}</span>
            </div>
            {habit.metric === "CHECK" ? (
                <CheckLogForm habit={habit} />
            ) : habit.metric === "RATING" ? (
                <RatingLogForm habit={habit} />
            ) : habit.metric === "MESSAGE" ? (
                <MessageLogForm habit={habit} />
            ) : habit.metric === "NUMBER" ? (
                <NumberLogForm habit={habit} />
            ) : null}
        </>
    )
}

export default AddLogForm
