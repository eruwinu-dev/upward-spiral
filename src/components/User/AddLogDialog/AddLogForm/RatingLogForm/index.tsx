import { useGetHabit } from "@/hooks/habit/useGetHabit"
import { ratingLogSchema, RatingLogSchema, ratings } from "@/schemas/log"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {}

const RatingLogForm = (props: Props) => {
    const { data: habit } = useGetHabit()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RatingLogSchema>({
        resolver: zodResolver(ratingLogSchema),
        mode: "all",
        defaultValues: {
            message: "5",
        },
    })

    const onSubmit: SubmitHandler<RatingLogSchema> = async (data) => {
        console.log(data)
    }

    if (!habit) return <></>

    return (
        <form
            className="grid grid-cols-1 grid-flow-row gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-base">
                        {habit.message}
                    </span>
                </label>
                <div className="rating mx-auto">
                    {ratings.map((rating) => (
                        <input
                            key={rating}
                            type="radio"
                            className="mask mask-star bg-yellow-500"
                            value={rating}
                            {...register("message")}
                        />
                    ))}
                </div>
            </div>
            <div className="inline-flex items-center justify-end">
                <button type="submit" className="btn btn-sm w-full btn-success">
                    Log
                </button>
            </div>
        </form>
    )
}

export default RatingLogForm
