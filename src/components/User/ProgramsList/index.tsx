import useUserContext from "@/context/UserState"
import { useUpdateDateInfo } from "@/hooks/date/useUpdateDateInfo"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import { useGetPrograms } from "@/hooks/program/useGetPrograms"
import { matchParams } from "@/utils/parameters"
import { Program } from "@prisma/client"
import { useRouter } from "next/router"
import React, { MouseEvent } from "react"

type Props = {}

const ProgramsList = (props: Props) => {
    const {
        push,
        pathname,
        query: { params },
    } = useRouter()
    const { data: programs } = useGetPrograms()
    const { data: selectedProgram } = useGetProgram()
    const { mutateAsync: mutateUpdateDate } = useUpdateDateInfo()
    const { toggleDialog } = useUserContext()

    const paramsMap = matchParams(pathname)

    const goToProgramHandler =
        (program: Program) => async (event: MouseEvent<HTMLButtonElement>) => {
            const { slug } = program
            const { week } = await mutateUpdateDate(program.createdAt)
            push(
                {
                    pathname: slug ? "" : pathname,
                    query: { program: slug, week },
                },
                slug
                    ? pathname.startsWith("/home")
                        ? `/home/program/${slug}/week/${week}`
                        : `/trainer/program/${slug}`
                    : undefined,
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
                {pathname.startsWith("/home") ? null : (
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
                            selectedProgram &&
                            selectedProgram.slug === program.slug
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
