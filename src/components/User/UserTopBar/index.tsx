import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { CompleteProgram } from "@/types/program"
import { UserDialog } from "@/types/user"
import React, { MouseEvent } from "react"

type Props = {
    program: CompleteProgram
}

const UserTopBar = ({ program }: Props) => {
    const { toggleDialog } = useUserContext()
    const { push, pathname, render, renderPath } = usePageRender()

    const openDialogHandler =
        (prop: keyof UserDialog) => (event: MouseEvent<HTMLButtonElement>) =>
            toggleDialog(prop)

    const closeWindowHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if (!program) return
        push(
            {
                pathname,
                query: {},
            },
            renderPath({}),
            { shallow: true }
        )
    }

    return (
        <div className="sticky top-0 left-0 min-h-[7vh] max-h-[7vh] grid grid-cols-3 grid-flow-row py-1 px-2 bg-white col-span-12">
            <div className="inline-flex items-center justify-start w-full space-x-1">
                <h2 className="link link-hover text-lg font-semibold">
                    {program.name}
                </h2>
            </div>
            <div></div>
            <div className="inline-flex items-center justify-end space-x-2 relative">
                <button
                    type="button"
                    className="btn btn-circle btn-ghost"
                    onClick={closeWindowHandler}
                >
                    {Icons("close")}
                </button>
            </div>
        </div>
    )
}

export default UserTopBar
