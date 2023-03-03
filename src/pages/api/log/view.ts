import { NextApiRequest, NextApiResponse } from "next"
import { getLog, GetLogData } from "@/lib/log/getLogs"
import { FormattedLog } from "@/types/log"

type Data = {
    formattedLog: FormattedLog | null
}

interface ViewLogRequest extends NextApiRequest {
    body: GetLogData
}

const handler = async (req: ViewLogRequest, res: NextApiResponse<Data>) => {
    const { userId, habitSlug, startDate, week, day } = req.body

    const formattedLog = await getLog({
        userId,
        habitSlug,
        week,
        day,
        startDate,
    })

    res.status(200).json({ formattedLog })
}

export default handler
