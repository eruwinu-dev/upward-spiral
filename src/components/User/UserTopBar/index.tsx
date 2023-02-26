import useUserContext from "@/context/UserState"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import { UserDialog } from "@/types/user"
import React, { MouseEvent } from "react"
import ProgramViewDropdown from "./ProgramViewDropdown"

type Props = {}

const UserTopBar = (props: Props) => {
    const { data: program } = useGetProgram()
    const { toggleDialog } = useUserContext()

    const openDialogHandler =
        (prop: keyof UserDialog) => (event: MouseEvent<HTMLButtonElement>) =>
            toggleDialog(prop)

    return (
        <div className="sticky top-0 left-0 w-full p-2 border-b-2 inline-flex items-center justify-between z-10">
            {program ? (
                <div className="inline-flex items-center justify-start space-x-4">
                    <div>
                        <span className="font-bold">{program.name}</span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={openDialogHandler("addHabit")}
                    >
                        Add Habit
                    </button>
                </div>
            ) : (
                <div></div>
            )}
            <div className="inline-flex items-center justify-end space-x-2"></div>
        </div>
    )
}

export default UserTopBar
