import type { NextApiRequest, NextApiResponse } from "next"
import { addDays, addMinutes, isToday, toDate } from "date-fns"
import { toDateTimeString } from "@/utils/dates"
import { offsetDate } from "@/utils/timezone"

type Data = {
    dateTime: Date
    dateString: string
    offset: number
    timezone: string
    newString: string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { offset } = req.body
    const dateTime = new Date(new Date(Date.now()).toUTCString())

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    res.status(200).json({
        dateTime,
        dateString: toDateTimeString(dateTime),
        offset: dateTime.getTimezoneOffset(),
        timezone,
        newString: toDateTimeString(offsetDate(offset, dateTime)),
    })
}

export default handler
