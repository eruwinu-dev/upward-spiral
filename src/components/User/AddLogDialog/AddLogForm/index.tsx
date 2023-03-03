import { useGetHabit } from "@/hooks/habit/useGetHabit"
import React from "react"
import CheckLogForm from "./CheckLogForm"
import MessageLogForm from "./MessageLogForm"
import NumberLogForm from "./NumberLogForm"
import RatingLogForm from "./RatingLogForm"

type Props = {}

const AddLogForm = (props: Props) => {
    const { data: habit } = useGetHabit()

    if (!habit) return <></>

    if (habit.metric === "CHECK") return <CheckLogForm />
    if (habit.metric === "RATING") return <RatingLogForm />
    if (habit.metric === "MESSAGE") return <MessageLogForm />
    if (habit.metric === "NUMBER") return <NumberLogForm />

    return <></>
}

export default AddLogForm
