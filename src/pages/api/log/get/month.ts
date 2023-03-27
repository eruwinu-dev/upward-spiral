import type { NextApiRequest, NextApiResponse } from "next"
import { utcToTimezone } from "@/utils/timezone"
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns"

type Data = {
    dates: CalendarDay[]
}

type CalendarDay = {
    date: Date
    isCurrentMonth: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { month, year } = req.body
    const timezone = req.cookies["timezone"] || "UTC"

    const date = utcToTimezone(new Date(year, month), timezone)

    const start = startOfWeek(startOfMonth(date))
    const end = endOfWeek(endOfMonth(date))

    const days = eachDayOfInterval({ start, end })

    return days.map((day) => ({
        date,
        isCurrentMonth: isSameMonth(day, date),
    }))
}

export default handler
