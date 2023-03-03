import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetLog } from "@/hooks/log/useGetLog"
import React from "react"

type Props = {}

const ViewLogDialog = (props: Props) => {
    const { program, week, render, renderPath, push, pathname } =
        usePageRender()
    const {
        dialog: { viewLog: viewLogDialog },
        toggleDialog,
    } = useUserContext()

    const { data: log } = useGetLog()

    const toggleViewLogDialogHandler = () => {
        toggleDialog("viewLog")
        setTimeout(() => {
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
            isOpen={viewLogDialog}
            onClose={toggleViewLogDialogHandler}
            title="View Log"
        >
            <div className="grid grid-cols-1 grid-flow-row gap-2">
                {log ? (
                    <>
                        <div className="inline-flex items-center justify-start space-x-2">
                            <span className="font-semibold">Question: </span>
                            <span>{log.message}</span>
                        </div>
                        {log.logs.length ? (
                            <div className="grid grid-cols-1 grid-flow-row gap-2 place-items-start">
                                <span className="text-sm font-semibold">
                                    Your answer:
                                </span>
                                <span>{log.logs[0].message}</span>
                            </div>
                        ) : (
                            <div className="inline-flex items-center justify-center">
                                <span className="text-error">
                                    You failed to log this habit.
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <div></div>
                )}
            </div>
        </BaseDialog>
    )
}

export default ViewLogDialog
