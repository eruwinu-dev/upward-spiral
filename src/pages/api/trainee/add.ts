import { ProgramsOnTrainee } from "@prisma/client"
import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    trainee: ProgramsOnTrainee
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { programSlug, traineeId } = req.body

    const trainee = await prisma.programsOnTrainee.create({
        data: {
            program: {
                connect: {
                    slug: programSlug,
                },
            },
            trainee: {
                connect: {
                    id: traineeId,
                },
            },
        },
    })
    res.status(200).json({ trainee })
}

export default handler
