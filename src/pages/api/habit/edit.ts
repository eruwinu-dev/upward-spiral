import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    count: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { habitTypeId, creatorId, slug, ...data } = req.body

    const { count } = await prisma.habit.updateMany({
        where: { slug, creatorId },
        data: {
            ...data,
            habitTypeId,
        },
    })
    res.status(404).json({ count })
}

export default handler
