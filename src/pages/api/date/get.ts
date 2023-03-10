import type { NextApiRequest, NextApiResponse } from "next"
import { toDateTimeString } from "@/utils/dates"
import { utcToTimezone } from "@/utils/timezone"

type Data = {
    date: Date
    dateString: string
    newString: string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { timezone } = req.body

    const date = utcToTimezone(new Date(Date.now()), timezone)

    const utcDate = utcToTimezone(new Date(Date.now()), "UTC")

    res.status(200).json({
        date,
        dateString: toDateTimeString(date),
        newString: toDateTimeString(utcDate),
    })
}

export default handler
