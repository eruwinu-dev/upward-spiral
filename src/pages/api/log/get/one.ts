import { NextApiRequest, NextApiResponse } from "next"
import { getLog, GetLogData } from "@/lib/log/getLogs"
import { ViewLog } from "@/types/log"
import { toDateTimeString } from "@/utils/dates"
import { utcToTimezone } from "@/utils/timezone"

type Data = {
    log: ViewLog
}

interface ViewLogRequest extends NextApiRequest {
    body: GetLogData
}

const handler = async (req: ViewLogRequest, res: NextApiResponse<Data>) => {
    const { habitSlug, startDate, week, day } = req.body

    const userId = req.cookies["userId"] || ""
    const timezone = req.cookies["timezone"] || "UTC"

    const habitAndLog = await getLog({
        userId,
        habitSlug,
        week,
        day,
        startDate,
    })

    const selectedLog = habitAndLog ? habitAndLog.logs[0] : undefined

    const log: ViewLog = {
        habitSlug,
        question: habitAndLog ? habitAndLog.message : "",
        hasLog: !!habitAndLog,
        message: selectedLog ? selectedLog.message : undefined,
        logDateString: selectedLog
            ? toDateTimeString(
                  utcToTimezone(new Date(selectedLog.createdAt), timezone)
              )
            : undefined,
    }

    res.status(200).json({ log })
}

export default handler
