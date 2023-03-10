import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { slugify } from "@/utils/slugify"

type Data = {
    count: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { title, programId, ...data } = req.body

    const creatorId = req.cookies["userId"] || ""

    const { count } = await prisma.habit.updateMany({
        where: { slug: slugify(title), creatorId, programId },
        data,
    })
    res.status(404).json({ count })
}

export default handler
