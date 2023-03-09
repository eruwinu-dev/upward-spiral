import type { NextApiRequest, NextApiResponse } from "next"
import { getWeek } from "date-fns"

type Data = {
    week: number
    day: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { startDate } = req.body

    const currentWeek = getWeek(new Date(Date.now()), { weekStartsOn: 1 })
    const startWeek = getWeek(new Date(startDate), { weekStartsOn: 1 })

    res.status(200).json({ week: currentWeek - startWeek + 1, day: 0 })
}

export default handler
