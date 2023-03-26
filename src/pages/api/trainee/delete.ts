import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    count: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { programSlug, traineeId } = req.body

    const { count } = await prisma.programsOnTrainee.deleteMany({
        where: { program: { slug: programSlug }, traineeId },
    })

    res.status(200).json({ count })
}

export default handler
