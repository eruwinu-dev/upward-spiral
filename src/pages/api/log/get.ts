import { NextApiRequest, NextApiResponse } from "next"

import { Log } from "@prisma/client"
import { GetLogData, getLogs } from "@/lib/log/getLogs"

type Data = {
    logs: Record<string, Log[]>
}

interface GetLogsRequest extends NextApiRequest {
    body: GetLogData
}

const handler = async (req: GetLogsRequest, res: NextApiResponse<Data>) => {
    const { userId, programId, createdAt, week } = req.body

    const logs = await getLogs({ createdAt, week, programId, userId })

    res.status(200).json({ logs })
}

export default handler
