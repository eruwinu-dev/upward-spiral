import type { NextApiRequest, NextApiResponse } from "next"
import { toDateTimeString } from "@/utils/dates"
import { utcToTimezone } from "@/utils/timezone"

type Data = {
    localDate: Date
    localDateString: string
    utcDate: Date
    utcDateString: string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const timezone = req.cookies["timezone"] || "UTC"

    const localDate = utcToTimezone(new Date(Date.now()), timezone)
    const utcDate = utcToTimezone(new Date(Date.now()), "UTC")

    res.status(200).json({
        localDate,
        localDateString: toDateTimeString(localDate),
        utcDate,
        utcDateString: toDateTimeString(utcDate),
    })
}

export default handler
