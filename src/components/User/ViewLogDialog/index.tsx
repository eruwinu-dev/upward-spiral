import BaseDialog from "@/components/BaseDialog"
import Spinner from "@/components/Spinner"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetLog } from "@/hooks/log/useGetLog"
import React from "react"
import LogAnswer from "./LogAnswer"

type Props = {}

const ViewLogDialog = (props: Props) => {
    const { program, week, render, renderPath, push, pathname, view } =
        usePageRender()
    const {
        dialog: { viewLog: viewLogDialog },
        toggleDialog,
    } = useUserContext()

    const { data: log, isLoading } = useGetLog()

    const toggleViewLogDialogHandler = () => {
        toggleDialog("viewLog")
        if (view) return
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
            title={isLoading ? "Loading..." : "View Log"}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {isLoading ? (
                    <div className="inline-flex items-center justify-center p-4">
                        <Spinner />
                    </div>
                ) : null}
                {log ? (
                    <>
                        <div className="grid grid-cols-1 grid-flow-row gap-2">
                            <span className="text-sm font-semibold">Task</span>
                            <span>{log.question}</span>
                        </div>
                        {log.hasLog && log.message && log.logDateString ? (
                            <LogAnswer
                                message={log.message}
                                date={log.logDateString}
                            />
                        ) : (
                            <div className="grid grid-cols-1 grid-flow-row gap-2">
                                <span className="text-sm font-semibold">
                                    Status
                                </span>
                                <span className="badge badge-lg font-semibold">
                                    No Log
                                </span>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </BaseDialog>
    )
}

export default ViewLogDialog
