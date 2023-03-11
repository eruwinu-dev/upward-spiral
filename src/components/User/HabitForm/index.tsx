import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useAddHabit } from "@/hooks/habit/useAddHabit"
import { useEditHabit } from "@/hooks/habit/useEditHabit"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import {
    frequencies,
    HabitSchema,
    HabitSchemaIndices,
    metrics,
} from "@/schemas/habit"
import { capitalize } from "@/utils/capitalize"
import { daysOfWeek } from "@/utils/dates"
import { range } from "@/utils/range"
import { slugify } from "@/utils/slugify"
import { HabitFrequency, HabitMetric } from "@prisma/client"
import React, { MouseEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import HabitMetricGuide from "./HabitMetricGuide"

type Props = {
    form: "add" | "edit"
}

const pageFields = new Map<number, HabitSchemaIndices[]>([
    [1, ["title", "message"]],
    [2, ["habitTypeId", "metric"]],
    [3, ["frequency", "repeatDay", "duration"]],
])

const HabitForm = ({ form }: Props) => {
    const {
        action: { addHabit: addHabitAction, editHabit: editHabitAction },
        toggleAction,
    } = useUserContext()
    const { role, habit: habitSlug } = usePageRender()

    const [page, setPage] = useState<number>(1)

    const { data: groups } = useGetHabits()
    const { mutateAsync: MutateAddHabit } = useAddHabit()
    const { mutateAsync: MutateEditHabit } = useEditHabit()

    const {
        register,
        watch,
        resetField,
        trigger,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "all",
    })

    const habits = groups ? groups.flatMap((group) => group.habits) : undefined
    const habit =
        form === "edit"
            ? habits
                ? habits.find((habitItem) => habitItem.slug === habitSlug)
                : undefined
            : undefined

    const types = groups
        ? groups.map((group) => ({
              id: group.id,
              title: group.title,
              isCustom: group.isCustom,
          }))
        : undefined

    const {
        title,
        message,
        habitTypeId,
        metric,
        frequency,
        repeatDay,
        duration,
    } = watch()

    const validatePage = async (page: number) => {
        const isValidated = await trigger(pageFields.get(page))
        if (!isValidated) return
        return isValidated
    }

    const togglePageHandler =
        (direction: -1 | 1) => async (event: MouseEvent<HTMLButtonElement>) => {
            if (direction === 1) {
                const isValidated = await validatePage(page)
                if (!isValidated) return
            } else {
            }
            setPage((page) => page + direction)
        }

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        const isValidated = await validatePage(3)
        if (!isValidated) return

        const data: HabitSchema = {
            title,
            message,
            habitTypeId:
                habitTypeId ||
                (types?.find((type) => type.isCustom)?.id as string),
            metric: metric as HabitMetric,
            frequency: frequency as HabitFrequency,
            repeatDay: repeatDay ? Number(repeatDay) : undefined,
            duration: duration ? Number(duration) : undefined,
        }

        if (form === "add") {
            toggleAction("addHabit", "LOADING")
            const slug = await MutateAddHabit(data)
            if (!slug) return
            toggleAction("addHabit", "SUCCESS")
        } else if (form === "edit") {
            toggleAction("editHabit", "LOADING")
            const count = await MutateEditHabit(data)
            if (!count) return
            toggleAction("editHabit", "SUCCESS")
        }
    }

    useEffect(() => {
        if (page === 1) {
            setValue("title", title)
            setValue("message", message)
        } else if (page === 2) {
            setValue("metric", metric)
            setValue("habitTypeId", habitTypeId)
        } else if (page == 3) {
            setValue("frequency", frequency)
            setValue("repeatDay", repeatDay)
            setValue("duration", duration)
        }
        return () => {}
    }, [page, watch])

    useEffect(() => {
        if (form !== "edit" || !habit || !types) return
        setValue("title", habit.title)
        setValue("message", habit.message)
        setValue("metric", habit.metric)
        setValue("habitTypeId", habit.habitTypeId)
        setValue("frequency", habit.frequency)
        setValue("repeatDay", habit.repeatDay || 0)
        return () => {}
    }, [])

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-4">
            {page === 1 ? (
                <form>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                            {errors.title && (
                                <span className="error-message">
                                    {errors.title?.message as string}
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            className={[
                                "input input-sm input-bordered",
                                errors.title ? "input-error" : "",
                            ].join(" ")}
                            placeholder="Habit title"
                            disabled={
                                addHabitAction === "LOADING" ||
                                form === "edit" ||
                                editHabitAction === "LOADING"
                            }
                            {...register("title", {
                                required: { value: true, message: "Required" },
                                minLength: { value: 1, message: "Required" },
                                validate: {
                                    taken: habitSlug
                                        ? () => true
                                        : (value) =>
                                              (habits
                                                  ? !habits.some(
                                                        (habit) =>
                                                            habit.slug ===
                                                            slugify(
                                                                value as string
                                                            )
                                                    )
                                                  : false) || "Title is taken",
                                },
                            })}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message</span>
                            {errors.message && (
                                <span className="error-message">Required</span>
                            )}
                        </label>
                        <textarea
                            rows={3}
                            className={[
                                "textarea textarea-sm textarea-bordered",
                                errors.message ? "textarea-error" : "",
                            ].join(" ")}
                            placeholder="Habit Message"
                            disabled={
                                addHabitAction === "LOADING" ||
                                editHabitAction === "LOADING"
                            }
                            {...register("message", {
                                required: { value: true, message: "Required" },
                                minLength: { value: 1, message: "Required" },
                            })}
                        />
                    </div>
                </form>
            ) : page === 2 ? (
                <div>
                    {role === "TRAINER" ? (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Habit Type</span>
                                {errors.habitTypeId && (
                                    <span className="error-message">
                                        Required
                                    </span>
                                )}
                            </label>
                            {types ? (
                                <select
                                    className={[
                                        "select select-sm select-bordered w-full font-normal",
                                        errors.habitTypeId
                                            ? "select-error"
                                            : "",
                                    ].join(" ")}
                                    disabled={addHabitAction === "LOADING"}
                                    defaultValue=""
                                    {...register("habitTypeId", {
                                        required: {
                                            value: role === "TRAINER",
                                            message: "Required",
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "Required",
                                        },
                                    })}
                                >
                                    <option disabled value="">
                                        Select Habit Type
                                    </option>
                                    {types
                                        .filter((type) => !type.isCustom)
                                        .map((type) => (
                                            <option
                                                key={type.id}
                                                value={type.id}
                                                label={type.title}
                                                className="font-base"
                                            />
                                        ))}
                                </select>
                            ) : null}
                        </div>
                    ) : null}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Metric</span>
                            {errors.metric && (
                                <span className="error-message">
                                    {errors.metric.message as string}
                                </span>
                            )}
                        </label>
                        <select
                            className={[
                                "select select-sm select-bordered w-full font-normal",
                                errors.metric ? "select-error" : "",
                            ].join(" ")}
                            disabled={
                                addHabitAction === "LOADING" ||
                                form === "edit" ||
                                editHabitAction === "LOADING"
                            }
                            defaultValue=""
                            {...register("metric", {
                                required: { value: true, message: "Required" },
                                minLength: { value: 1, message: "Required" },
                            })}
                        >
                            <option disabled value="">
                                Select how you will grade your metric
                            </option>
                            {metrics.map((metric) => (
                                <option
                                    key={metric}
                                    value={metric}
                                    label={capitalize(
                                        metric.toLocaleLowerCase()
                                    )}
                                    className="font-base"
                                />
                            ))}
                        </select>
                    </div>
                    <HabitMetricGuide metric={metric as HabitMetric} />
                </div>
            ) : page === 3 ? (
                <div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Frequency</span>
                            {errors.frequency && (
                                <span className="error-message">
                                    {errors.frequency?.message as string}
                                </span>
                            )}
                        </label>
                        <select
                            className={[
                                "select select-sm select-bordered w-full font-normal",
                                errors.frequency ? "select-error" : "",
                            ].join(" ")}
                            disabled={
                                addHabitAction === "LOADING" ||
                                form === "edit" ||
                                editHabitAction === "LOADING"
                            }
                            defaultValue=""
                            {...register("frequency", {
                                required: { value: true, message: "Required" },
                                minLength: { value: 1, message: "Required" },
                                onChange: (event) => {
                                    resetField("repeatDay")
                                    resetField("duration")
                                },
                            })}
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
                    {["WEEKLY", "BIWEEKLY"].includes(frequency as string) ? (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Repeat Day</span>
                                {errors.repeatDay && (
                                    <span className="error-message">
                                        {errors.repeatDay?.message as string}
                                    </span>
                                )}
                            </label>
                            <select
                                className={[
                                    "select select-sm select-bordered w-full font-normal",
                                    errors.repeatDay ? "select-error" : "",
                                ].join(" ")}
                                disabled={
                                    addHabitAction === "LOADING" ||
                                    form === "edit" ||
                                    editHabitAction === "LOADING"
                                }
                                defaultValue=""
                                {...register("repeatDay", {
                                    required: {
                                        value: frequency === "DAILY",
                                        message: "Required",
                                    },
                                    minLength: {
                                        value: 1,
                                        message: "Required",
                                    },
                                })}
                            >
                                <option disabled value="">
                                    Select the day you will repeat your habit
                                </option>
                                {daysOfWeek.map((day, index) => (
                                    <option
                                        key={day}
                                        value={index}
                                        label={day}
                                        className="font-base"
                                    />
                                ))}
                            </select>
                        </div>
                    ) : null}
                    {frequency === "CUSTOM" ? (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Duration</span>
                                {errors.duration && (
                                    <span className="error-message">
                                        {errors.duration?.message as string}
                                    </span>
                                )}
                            </label>
                            <select
                                className={[
                                    "select select-sm select-bordered w-full font-normal",
                                    errors.duration ? "select-error" : "",
                                ].join(" ")}
                                disabled={
                                    addHabitAction === "LOADING" ||
                                    editHabitAction === "LOADING"
                                }
                                defaultValue=""
                                {...register("duration", {
                                    required: {
                                        value: frequency === "CUSTOM",
                                        message: "Required",
                                    },
                                    minLength: {
                                        value: 1,
                                        message: "Required",
                                    },
                                })}
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
            ) : null}
            <div className="grid grid-cols-2 grid-flow-row place-content-between">
                <button
                    type="button"
                    className={[
                        "btn btn-sm btn-secondary btn-outline place-self-start",
                        addHabitAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                    onClick={togglePageHandler(-1)}
                    disabled={page == 1 || addHabitAction === "LOADING"}
                >
                    Previous
                </button>
                {page === 3 ? (
                    form === "add" ? (
                        <button
                            type="button"
                            className={[
                                "btn btn-sm btn-success place-self-end",
                                addHabitAction === "LOADING" ? "loading" : "",
                            ].join(" ")}
                            onClick={submitHandler}
                        >
                            Add Habit
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={[
                                "btn btn-sm btn-secondary place-self-end",
                                editHabitAction === "LOADING" ? "loading" : "",
                            ].join(" ")}
                            onClick={submitHandler}
                        >
                            Edit Habit
                        </button>
                    )
                ) : (
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary btn-outline place-self-end"
                        onClick={togglePageHandler(1)}
                        disabled={page == 3}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default HabitForm
