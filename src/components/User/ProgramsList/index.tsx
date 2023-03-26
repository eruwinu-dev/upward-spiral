import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useUpdateDateInfo } from "@/hooks/date/useUpdateDateInfo"
import { useGetPrograms } from "@/hooks/program/useGetPrograms"
import { Program } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {}

const ProgramsList = (props: Props) => {
    const {
        push,
        pathname,
        role,
        program: programSlug,
        render,
        renderPath,
    } = usePageRender()
    const { data: programs } = useGetPrograms()
    const { mutateAsync: mutateUpdateDate } = useUpdateDateInfo()
    const { toggleDialog } = useUserContext()

    const goToProgramHandler =
        (program: Program) => async (event: MouseEvent<HTMLButtonElement>) => {
            const { week } = await mutateUpdateDate(program.slug)
            push(
                {
                    pathname,
                    query:
                        render === "static"
                            ? role === "USER"
                                ? { program: program.slug, week }
                                : { program: program.slug }
                            : {},
                },
                renderPath({ program: program.slug, week }),
                { shallow: true }
            )
        }

    const showAddProgramDialogHandler = (event: MouseEvent) =>
        toggleDialog("addProgram")

    if (!programs) return <></>

    return (
        <div className="w-full rounded-lg grid grid-cols-1 grid-flow-row gap-2">
            <div className="mt-4 p-1 inline-flex items-center justify-start space-x-2">
                <span className="font-bold">My Programs</span>
                {role === "USER" ? null : (
                    <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={showAddProgramDialogHandler}
                    >
                        Add
                    </button>
                )}
            </div>
            {programs.length ? (
                programs.map((program) => (
                    <button
                        type="button"
                        className={[
                            "w-full btn btn-sm capitalize inline-flex items-center justify-start",
                            programSlug === program.slug
                                ? "btn-active btn-ghost"
                                : "btn-ghost",
                        ].join(" ")}
                        key={program.id}
                        onClick={goToProgramHandler(program)}
                    >
                        {program.name}
                    </button>
                ))
            ) : (
                <div className="p-1">
                    <span className="text-sm">0 programs</span>
                </div>
            )}
        </div>
    )
}

export default ProgramsList
