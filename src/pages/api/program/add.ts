import prisma from "@/lib/prisma"
import { utcToTimezone } from "@/utils/timezone"
import { Program } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    program: Program
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { startDate, ...data } = req.body

    const trainerId = req.cookies["userId"] || ""

    const program = await prisma.program.create({
        data: {
            ...data,
            startDate: utcToTimezone(new Date(startDate), "UTC"),
            trainer: {
                connect: { id: trainerId },
            },
        },
    })
    res.status(200).json({ program })
}

export default handler
