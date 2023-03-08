import { StatusLogs } from "@/types/log"
import React, { CSSProperties } from "react"

type Props = {
    logs: StatusLogs
}

interface ProgressProperties extends CSSProperties {
    "--value": number
    "--size": string
}

const HabitProgress = ({ logs }: Props) => {
    const progress = (logs.logs.length / logs.total) * 100
    const lapseRate = (logs.lapsed / (logs.lapsed + logs.logs.length)) * 100

    const makeProgressStyle = (progress: number): ProgressProperties => ({
        "--value": progress,
        "--size": "6rem",
    })

    return (
        <>
            <div className="grid grid-cols-1 grid-flow-row gap-4 place-items-center p-4">
                <div className="relative place-content-center">
                    <div
                        className="radial-progress text-secondary absolute z-[2]"
                        style={makeProgressStyle(progress)}
                    >
                        {`${progress.toFixed(2)}%`}
                    </div>
                    <div
                        className="radial-progress text-neutral mx-auto"
                        style={makeProgressStyle(100)}
                    ></div>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2 place-items-center">
                    <span className="text-3xl font-extrabold">
                        <span className="text-secondary">
                            {logs.logs.length}
                        </span>
                        <span>{`/${logs.total}`}</span>
                    </span>
                    <div className="">
                        <span className="text-sm font-semibold">
                            Completed logs
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-4 place-items-center">
                <div className="relative place-content-center">
                    <div
                        className="radial-progress text-error absolute z-[2]"
                        style={makeProgressStyle(lapseRate)}
                    >
                        {`${lapseRate.toFixed(2)}%`}
                    </div>
                    <div
                        className="radial-progress text-neutral mx-auto"
                        style={makeProgressStyle(100)}
                    ></div>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2 place-items-center">
                    <span className="text-3xl font-extrabold">
                        <span className="text-error">{logs.lapsed}</span>
                        <span>{`/${logs.lapsed + logs.logs.length}`}</span>
                    </span>
                    <div className="">
                        <span className="text-sm font-semibold">
                            Lapsed Logs
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HabitProgress
