import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import React from "react"
import AddLogForm from "./AddLogForm"

type Props = {}

const AddLogDialog = (props: Props) => {
    const {
        dialog: { addLog: addLogDialog },
        action: { addLog: addLogAction },
        toggleAction,
        toggleDialog,
    } = useUserContext()
    const { program, week, push, pathname, render, renderPath } =
        usePageRender()

    const toggleAddLogDialogHandler = () => {
        toggleDialog("addLog")
        setTimeout(() => {
            toggleAction("addLog", "IDLE")
            push(
                {
                    pathname,
                    query: render === "static" ? { program, week } : {},
                },
                renderPath({
                    program,
                    week,
                }),
                { shallow: true }
            )
        }, 250)
    }

    return (
        <BaseDialog
            isOpen={addLogDialog}
            closeOnBlur={addLogAction !== "LOADING"}
            onClose={toggleAddLogDialogHandler}
            title="Add Log"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {addLogAction !== "SUCCESS" ? (
                    <AddLogForm />
                ) : (
                    <div className="place-self-center">Added log!</div>
                )}
            </div>
        </BaseDialog>
    )
}

export default AddLogDialog
