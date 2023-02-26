import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import { UserDialog } from "@/types/user"
import { User } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    trainee: User
}

const TraineeGridItem = ({ trainee }: Props) => {
    const { toggleDialog, selectUser } = useUserContext()

    const openTraineeDialogHandler =
        (prop: keyof UserDialog) => (event: MouseEvent<HTMLAnchorElement>) => {
            selectUser(trainee.id)
            toggleDialog(prop)
        }

    return (
        <div className="w-full p-2 hover:bg-white inline-flex items-center justify-between rounded-lg">
            <span className="text-sm">{trainee.name}</span>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
                    {Icons("vertical-dots")}
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
                >
                    <li>
                        <a
                            className="text-sm"
                            onClick={openTraineeDialogHandler("deleteTrainee")}
                        >
                            Remove Trainee
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TraineeGridItem
