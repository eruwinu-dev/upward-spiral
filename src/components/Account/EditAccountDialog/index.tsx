import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import React from "react"

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
            title="Edit User"
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
