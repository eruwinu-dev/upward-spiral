import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    count: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug, creatorId } = req.body
    const { count } = await prisma.habit.deleteMany({
        where: { slug, creatorId },
    })
    res.status(404).json({ count })
}

export default handler
