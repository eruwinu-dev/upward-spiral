import prisma from "@/lib/prisma"
import { Program } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    program: Program
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { trainerId, ...data } = req.body
    const program = await prisma.program.create({
        data: {
            ...data,
            trainer: {
                connect: { id: trainerId },
            },
        },
    })
    res.status(200).json({ program })
}

export default handler
