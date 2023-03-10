import BaseDialog from "@/components/BaseDialog"
import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import React, { MouseEvent } from "react"

type Props = {}

const EditUserDialog = (props: Props) => {
    const {
        dialog: { editUser: editUserDialog },
        toggleDialog,
    } = useUserContext()

    const toggleEditUserDialogHandler = () => {
        toggleDialog("editUser")
    }

    return (
        <BaseDialog
            isOpen={editUserDialog}
            onClose={toggleEditUserDialogHandler}
            title="Build Great Habits."
        >
            <div className="w-full grid grid-cols-1 grid-flow-row p-4">
                <div className="grid grid-cols-1 grid-flow-row place-items-center gap-4">
                    <p className="text-center">Updated account information.</p>
                </div>
            </div>
        </BaseDialog>
    )
}

export default EditUserDialog
