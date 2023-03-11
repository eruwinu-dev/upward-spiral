import type { NextApiRequest, NextApiResponse } from "next"
import { toDateString } from "@/utils/dates"
import { utcToTimezone } from "@/utils/timezone"
import { addDays, addWeeks, eachDayOfInterval } from "date-fns"
import { GetWeekData } from "@/types/date"

type Data = GetWeekData

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { startDate, week } = req.body
    const timezone = req.cookies["timezone"] || "UTC"

    const current = addWeeks(
        utcToTimezone(new Date(startDate), timezone),
        week - 1
    )

    const days = eachDayOfInterval({
        start: current,
        end: addDays(current, 6),
    })

    res.status(200).json({
        start: days[0],
        startDateString: toDateString(days[0]),
        end: days[6],
        endDateString: toDateString(days[6]),
    })
}

export default handler
