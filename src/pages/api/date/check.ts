import type { NextApiRequest, NextApiResponse } from "next"
import { getDay, getWeek } from "date-fns"

type Data = {
    check: boolean
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { createdAt, week, day } = req.body

    res.status(200).json({ check: false })
}

export default handler
