import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    count: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug, trainerId } = req.body
    const { count } = await prisma.program.deleteMany({
        where: { slug, trainerId, type: "CUSTOM" },
    })
    res.status(200).json({ count })
}

export default handler
