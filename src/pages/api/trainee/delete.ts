import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    count: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { programId, traineeId } = req.body

    const { count } = await prisma.programsOnTrainee.deleteMany({
        where: { programId, traineeId },
    })

    res.status(200).json({ count })
}

export default handler
