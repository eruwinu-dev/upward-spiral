import useUserContext from "@/context/UserState"
import { useAddProgram } from "@/hooks/program/useAddProgram"
import { useGetPrograms } from "@/hooks/program/useGetPrograms"
import { programSchema, ProgramSchema } from "@/schemas/program"
import { slugify } from "@/utils/slugify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import React from "react"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { matchParams } from "@/utils/parameters"
import { Program } from "@prisma/client"

type Props = {}

const AddProgramForm = (props: Props) => {
    const {
        push,
        query: { slug: programSlug, params },
        pathname,
    } = useRouter()
    const {
        action: { addProgram: addProgramAction },
        toggleAction,
    } = useUserContext()
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<ProgramSchema>({
        resolver: zodResolver(programSchema),
        mode: "all",
    })
    const { data: programs } = useGetPrograms()
    const { mutateAsync: mutateAddProgram } = useAddProgram()

    const paramsMap = matchParams(params)

    const slug = pathname.endsWith("[...params]")
        ? paramsMap.get("slug") || ""
        : (programSlug as string)

    const slugs = programs ? programs.map((program) => program.slug) : []
    const isNameTaken = slugs.includes(slugify(watch("name") || ""))

    const onSubmit: SubmitHandler<ProgramSchema> = async (data) => {
        if (isNameTaken) return
        toggleAction("addProgram", "LOADING")
        const program = (await mutateAddProgram(data)) as Program
        toggleAction("addProgram", "SUCCESS")
        if (!program) return
        push(
            {
                pathname,
                query: { program: program.slug, week: 1 },
            },
            `/${pathname.startsWith("/home") ? "home" : "trainer"}/program/${
                program.slug
            }/week/1`,
            { shallow: true }
        )
    }

    return (
        <form
            className="grid grid-cols-2 grid-flow-row gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Program Name</span>
                        {errors.name && (
                            <span className="error-message">
                                {errors.name?.message}
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
                            errors.name || isNameTaken ? "input-error" : "",
                        ].join(" ")}
                        placeholder="Name of your program"
                        disabled={addProgramAction === "LOADING"}
                        {...register("name")}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Program Description</span>
                        {errors.description && (
                            <span className="error-message">
                                {errors.description?.message}
                            </span>
                        )}
                    </label>
                    <textarea
                        className={[
                            "textarea textarea-sm input-bordered resize-none",
                            errors.description ? "textarea-error" : "",
                        ].join(" ")}
                        rows={4}
                        placeholder="Program Description"
                        disabled={addProgramAction === "LOADING"}
                        {...register("description")}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Start Date</span>
                        {errors.startDate && (
                            <span className="error-message">
                                {errors.startDate?.message}
                            </span>
                        )}
                    </label>
                    <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                            <DatePicker
                                className={[
                                    "input input-sm input-bordered w-full",
                                    errors.startDate ? "input-error" : "",
                                ].join(" ")}
                                placeholderText="MM/DD/YYYY"
                                onChange={(date: Date) => field.onChange(date)}
                                filterDate={(date) => date.getDay() === 1}
                                selected={field.value}
                                calendarStartDay={1}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="col-span-2 p-4"></div>
            <div className="col-span-2 inline-flex items-center justify-end space-x-2">
                <button
                    type="submit"
                    className={[
                        "btn btn-sm btn-success",
                        addProgramAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                    disabled={addProgramAction === "LOADING"}
                >
                    Add Program
                </button>
            </div>
        </form>
    )
}

export default AddProgramForm
