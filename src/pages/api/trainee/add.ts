import { ProgramsOnTrainee } from "@prisma/client"
import prisma from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    trainee: ProgramsOnTrainee
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { programId, traineeId } = req.body

    const trainee = await prisma.programsOnTrainee.create({
        data: {
            program: {
                connect: {
                    id: programId,
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
