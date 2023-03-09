import type { NextApiRequest, NextApiResponse } from "next"
import { addDays, isToday } from "date-fns"
import { toDateTimeString } from "@/utils/dates"

type Data = {
    dateTime: Date
    dateString: string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const dateTime = new Date(Date.now())
    res.status(200).json({ dateTime, dateString: toDateTimeString(dateTime) })
}

export default handler
