import { useGetHabit } from "@/hooks/habit/useGetHabit"
import { numberLogSchema, NumberLogSchema, ratings } from "@/schemas/log"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {}

const NumberLogForm = (props: Props) => {
    const { data: habit } = useGetHabit()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NumberLogSchema>({
        resolver: zodResolver(numberLogSchema),
        mode: "all",
    })

    const onSubmit: SubmitHandler<NumberLogSchema> = async (data) => {
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
                    {errors.message && (
                        <span className="error-message">
                            {errors.message?.message}
                        </span>
                    )}
                </label>
                <input
                    type="number"
                    step={0.01}
                    className={[
                        "input input-sm input-bordered",
                        errors.message ? "input-error" : "",
                    ].join(" ")}
                    id="price"
                    {...register("message", { valueAsNumber: true })}
                />
            </div>
            <div className="inline-flex items-center justify-end">
                <button type="submit" className="btn btn-sm w-full btn-success">
                    Log
                </button>
            </div>
        </form>
    )
}

export default NumberLogForm
