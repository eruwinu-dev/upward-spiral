import { useGetHabit } from "@/hooks/habit/useGetHabit"
import { messageLogSchema, MessageLogSchema } from "@/schemas/log"
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
    } = useForm<MessageLogSchema>({
        resolver: zodResolver(messageLogSchema),
        mode: "all",
    })

    const onSubmit: SubmitHandler<MessageLogSchema> = async (data) => {
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
                <textarea
                    rows={4}
                    className={[
                        "textarea textarea-sm textarea-bordered",
                        errors.message ? "textarea-error" : "",
                    ].join(" ")}
                    placeholder="Your answer"
                    {...register("message")}
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
