import useUserContext from "@/context/UserState"
import { useAddLog } from "@/hooks/log/useAddLog"
import { messageLogSchema, MessageLogSchema } from "@/schemas/log"
import { zodResolver } from "@hookform/resolvers/zod"
import { Habit } from "@prisma/client"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {
    habit: Habit
}

const NumberLogForm = ({ habit }: Props) => {
    const {
        toggleAction,
        action: { addLog: addLogAction },
    } = useUserContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MessageLogSchema>({
        resolver: zodResolver(messageLogSchema),
        mode: "all",
    })
    const { mutateAsync: mutateAddLog } = useAddLog()

    const onSubmit: SubmitHandler<MessageLogSchema> = async ({ message }) => {
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
                <textarea
                    rows={4}
                    disabled={addLogAction === "LOADING"}
                    className={[
                        "textarea textarea-sm textarea-bordered",
                        errors.message ? "textarea-error" : "",
                    ].join(" ")}
                    placeholder="Your answer"
                    {...register("message")}
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
                    disabled={addLogAction === "LOADING"}
                    className={[
                        "btn btn-sm w-full btn-success",
                        addLogAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                >
                    Log
                </button>
            </div>
        </form>
    )
}

export default NumberLogForm
