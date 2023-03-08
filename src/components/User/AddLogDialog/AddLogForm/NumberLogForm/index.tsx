import useUserContext from "@/context/UserState"
import { useAddLog } from "@/hooks/log/useAddLog"
import { numberLogSchema, NumberLogSchema, ratings } from "@/schemas/log"
import { zodResolver } from "@hookform/resolvers/zod"
import { Habit } from "@prisma/client"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {
    habit: Habit
}

const NumberLogForm = ({ habit }: Props) => {
    const {
        action: { addLog: addLogAction },
        toggleAction,
    } = useUserContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NumberLogSchema>({
        resolver: zodResolver(numberLogSchema),
        mode: "all",
    })
    const { mutateAsync: mutateAddLog } = useAddLog()

    const onSubmit: SubmitHandler<NumberLogSchema> = async ({ message }) => {
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
            className="grid grid-cols-1 grid-flow-row gap-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-base">
                        {habit.message}
                    </span>
                </label>
                <input
                    type="number"
                    placeholder="Write a number to answer the question"
                    step={0.01}
                    disabled={addLogAction === "LOADING"}
                    className={[
                        "input input-sm input-bordered",
                        errors.message ? "input-error" : "",
                    ].join(" ")}
                    id="price"
                    {...register("message", { valueAsNumber: true })}
                />
            </div>
            {errors.message && (
                <span className="error-message mb-2">
                    {errors.message?.message}
                </span>
            )}
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

export default NumberLogForm
