import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Habit } from "@prisma/client"

type Data = {
    habit: Habit
    programSlug: string
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { programId, habitTypeId, creatorId, ...data } = req.body

    const habit = await prisma.habit.create({
        data: {
            ...data,
            program: {
                connect: { id: programId },
            },
            habitType: {
                connect: { id: habitTypeId },
            },
            creator: {
                connect: { id: creatorId },
            },
        },
        include: { program: true },
    })

    res.status(200).json({ habit, programSlug: habit.program?.slug || "" })
}

export default handler
