import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { slugify } from "@/utils/slugify"

type Data = {
    count: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { title, habitTypeId, creatorId, slug, ...data } = req.body

    const { count } = await prisma.habit.updateMany({
        where: { slug, creatorId },
        data: {
            ...data,
            title,
            slug: slugify(title),
            habitTypeId,
        },
    })
    res.status(404).json({ count })
}

export default handler
