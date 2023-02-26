import type { NextApiRequest, NextApiResponse } from "next"
import { getDay, getWeek } from "date-fns"

type Data = {
    week: number
    day: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { createdAt } = req.body
    const startDate = new Date(createdAt)
    const startWeek = getWeek(startDate, { weekStartsOn: getDay(startDate) })
    const currentTimeStamp = Date.now()
    const currentWeek = getWeek(new Date(currentTimeStamp), {
        weekStartsOn: getDay(startDate),
    })

    res.status(200).json({ week: currentWeek - startWeek + 1, day: 0 })
}

export default handler
