import useUserContext from "@/context/UserState"
import { useAddLog } from "@/hooks/log/useAddLog"
import { ratingLogSchema, RatingLogSchema, ratings } from "@/schemas/log"
import { zodResolver } from "@hookform/resolvers/zod"
import { Habit } from "@prisma/client"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {
    habit: Habit
}

const RatingLogForm = ({ habit }: Props) => {
    const {
        action: { addLog: addLogAction },
        toggleAction,
    } = useUserContext()
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
    const { mutateAsync: mutateAddLog } = useAddLog()

    const onSubmit: SubmitHandler<RatingLogSchema> = async ({ message }) => {
        toggleAction("addLog", "LOADING")
        const log = await mutateAddLog({
            message: `${habit.metric} --- ${message}`,
            habitId: habit.id,
        })
        if (!log) return
        toggleAction("addLog", "SUCCESS")
    }

    return (
        <form
            className="grid grid-cols-1 grid-flow-row"
            onSubmit={handleSubmit(onSubmit)}
        >
            <span className="text-sm font-semibold">
                Rate your habit performance for this day. One star is the lowest
                while five stars is the highest.
            </span>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-base">
                        {habit.message}
                    </span>
                </label>
                <div className="rating mx-auto p-2">
                    {ratings.map((rating) => (
                        <input
                            key={rating}
                            type="radio"
                            className="mask mask-star bg-yellow-500"
                            value={rating}
                            disabled={addLogAction === "LOADING"}
                            {...register("message")}
                        />
                    ))}
                </div>
            </div>
            <div className="inline-flex items-center justify-end">
                <button
                    type="submit"
                    className={[
                        "btn btn-sm w-full btn-success",
                        addLogAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                    disabled={addLogAction === "LOADING"}
                >
                    Log
                </button>
            </div>
        </form>
    )
}

export default RatingLogForm
