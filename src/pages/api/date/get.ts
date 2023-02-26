import type { NextApiRequest, NextApiResponse } from "next"
import { getDay, getWeek } from "date-fns"

type SafeDate = {
    date: string
}

type Data = {}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { createdAt, week, day } = req.body

    if (!day) {
        console.log("week view")
    } else {
        console.log("day view")
    }

    res.status(200).json({ date: "" })
}

export default handler
