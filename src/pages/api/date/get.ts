import type { NextApiRequest, NextApiResponse } from "next"
import { addDays, isToday } from "date-fns"

type Data = {
    isToday: Date
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { week, day, date } = req.body

    res.status(200).json({ isToday: date })
}

export default handler
