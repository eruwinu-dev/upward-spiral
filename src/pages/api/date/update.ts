import type { NextApiRequest, NextApiResponse } from "next"
import { getWeek } from "date-fns"
import { utcToTimezone } from "@/utils/timezone"

import prisma from "@/lib/prisma"

type Data = {
    week: number
    day: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug } = req.body

    const timezone = req.cookies["timezone"] || "UTC"

    const program = await prisma.program.findFirst({ where: { slug } })

    const current = utcToTimezone(new Date(Date.now()), timezone)
    const start = utcToTimezone(
        program ? new Date(program.startDate) : current,
        timezone
    )

    const currentWeek = getWeek(current, { weekStartsOn: 1 })
    const startWeek = getWeek(start, { weekStartsOn: 1 })

    res.status(200).json({ week: currentWeek - startWeek + 1, day: 0 })
}

export default handler
