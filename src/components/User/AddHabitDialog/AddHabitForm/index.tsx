import useUserContext from "@/context/UserState"
import { useAddHabit } from "@/hooks/habit/useAddHabit"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import { useGetHabitTypes } from "@/hooks/habit/useGetHabitTypes"
import { frequencies, metrics, HabitSchema, habitSchema } from "@/schemas/habit"
import { capitalize } from "@/utils/capitalize"
import { daysOfWeek } from "@/utils/dates"
import { range } from "@/utils/range"
import { slugify } from "@/utils/slugify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {}

const AddHabitForm = (props: Props) => {
    const {
        action: { addHabit: addHabitAction },
        toggleAction,
    } = useUserContext()
    const { pathname } = useRouter()

    const { data: groups } = useGetHabits()
    const { mutateAsync: mutateAddHabit } = useAddHabit()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<HabitSchema>({
        resolver: zodResolver(habitSchema),
        mode: "all",
    })

    const types = groups
        ? groups.map((group) => ({ id: group.id, title: group.title }))
        : []

    const watchFrequency = watch("frequency")

    const slugs = groups
        ? Object.values(groups)
              .map((group) => group.habits.map((habit) => habit.slug))
              .flatMap((habits) => habits)
        : []

    const isNameTaken = slugs.some((slug) => slug === watch("title"))

    const isTrainer = pathname.startsWith("/trainer")

    const habitTypes = types ? types : []

    const onSubmit: SubmitHandler<HabitSchema> = async (data) => {
        if (isNameTaken) return
        toggleAction("addHabit", "LOADING")
        const slug = await mutateAddHabit(data)
        if (!slug) return
        toggleAction("addHabit", "SUCCESS")
    }

    return (
        <form
            className="grid grid-cols-3 grid-flow-row gap-8 place-items-start"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-2 w-full">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                        {errors.title && (
                            <span className="error-message">
                                {errors.title?.message}
                            </span>
                        )}
                        {isNameTaken && (
                            <span className="error-message">
                                Must be unique.
                            </span>
                        )}
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.title || isNameTaken ? "input-error" : "",
                        ].join(" ")}
                        placeholder="Habit title"
                        disabled={addHabitAction === "LOADING"}
                        {...register("title")}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Question</span>
                        {errors.message && (
                            <span className="error-message">
                                {errors.message?.message}
                            </span>
                        )}
                    </label>
                    <textarea
                        className={[
                            "textarea textarea-sm input-bordered resize-none",
                            errors.message ? "textarea-error" : "",
                        ].join(" ")}
                        rows={4}
                        placeholder="Preferrably a question to ask yourself"
                        disabled={addHabitAction === "LOADING"}
                        {...register("message")}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-2 w-full">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Metric</span>
                        {errors.metric && (
                            <span className="error-message">
                                {errors.metric?.message}
                            </span>
                        )}
                    </label>
                    <select
                        className={[
                            "select select-sm select-bordered w-full font-normal",
                            errors.metric ? "select-error" : "",
                        ].join(" ")}
                        disabled={addHabitAction === "LOADING"}
                        defaultValue=""
                        {...register("metric")}
                    >
                        <option disabled value="">
                            Select how you will grade your metric
                        </option>
                        {metrics.map((metric) => (
                            <option
                                key={metric}
                                value={metric}
                                label={capitalize(metric.toLocaleLowerCase())}
                                className="font-base"
                            />
                        ))}
                    </select>
                </div>
                {isTrainer ? (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Habit Type</span>
                            {errors.habitTypeId && (
                                <span className="error-message">
                                    {errors.habitTypeId?.message}
                                </span>
                            )}
                        </label>
                        <select
                            className={[
                                "select select-sm select-bordered w-full font-normal",
                                errors.habitTypeId ? "select-error" : "",
                            ].join(" ")}
                            disabled={addHabitAction === "LOADING"}
                            defaultValue=""
                            {...register("habitTypeId")}
                        >
                            <option disabled value="">
                                Select Habit Type
                            </option>
                            {habitTypes.map((type) => (
                                <option
                                    key={type.id}
                                    value={type.id}
                                    label={type.title}
                                    className="font-base"
                                />
                            ))}
                        </select>
                    </div>
                ) : null}
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-2 w-full">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Frequency</span>
                        {errors.frequency && (
                            <span className="error-message">
                                {errors.frequency?.message}
                            </span>
                        )}
                    </label>
                    <select
                        className={[
                            "select select-sm select-bordered w-full font-normal",
                            errors.frequency ? "select-error" : "",
                        ].join(" ")}
                        disabled={addHabitAction === "LOADING"}
                        defaultValue=""
                        {...register("frequency")}
                    >
                        <option disabled value="">
                            Select how frequently you will do the habit
                        </option>
                        {frequencies.map((frequency) => (
                            <option
                                key={frequency}
                                value={frequency}
                                label={capitalize(
                                    frequency.toLocaleLowerCase()
                                )}
                                className="font-base"
                            />
                        ))}
                    </select>
                </div>
                {["WEEKLY", "BIWEEKLY"].includes(watchFrequency) ? (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Repeat Day</span>
                            {errors.repeatDay && (
                                <span className="error-message">
                                    {errors.repeatDay?.message}
                                </span>
                            )}
                        </label>
                        <select
                            className={[
                                "select select-sm select-bordered w-full font-normal",
                                errors.repeatDay ? "select-error" : "",
                            ].join(" ")}
                            disabled={addHabitAction === "LOADING"}
                            defaultValue=""
                            {...register("repeatDay")}
                        >
                            <option disabled value="">
                                Select they day you will repeat your habit
                            </option>
                            {daysOfWeek.map((day, index) => (
                                <option
                                    key={day}
                                    value={index + 1}
                                    label={day}
                                    className="font-base"
                                />
                            ))}
                        </select>
                    </div>
                ) : watchFrequency === "CUSTOM" ? (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Duration</span>
                            {errors.duration && (
                                <span className="error-message">
                                    {errors.duration?.message}
                                </span>
                            )}
                        </label>
                        <select
                            className={[
                                "select select-sm select-bordered w-full font-normal",
                                errors.duration ? "select-error" : "",
                            ].join(" ")}
                            disabled={addHabitAction === "LOADING"}
                            defaultValue=""
                            {...register("duration")}
                        >
                            <option disabled value="">
                                Select they week your custom habit ends
                            </option>
                            {range(1, 16).map((day) => (
                                <option
                                    key={day}
                                    value={day}
                                    label={`This habit ends on Week ${day}`}
                                    className="font-base"
                                />
                            ))}
                        </select>
                    </div>
                ) : null}
            </div>
            <div className="col-span-3 w-full inline-flex items-center justify-end space-x-2">
                <button
                    type="submit"
                    className={[
                        "btn btn-sm btn-success btn-wide",
                        addHabitAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                    disabled={addHabitAction === "LOADING"}
                >
                    Add Habit
                </button>
            </div>
        </form>
    )
}

export default AddHabitForm
