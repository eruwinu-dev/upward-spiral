import { NextApiRequest, NextApiResponse } from "next"

import { CompleteHabit, GroupedHabit } from "@/types/habit"
import { Role } from "@prisma/client"
import { getHabits } from "@/lib/habit/getHabits"

import prisma from "@/lib/prisma"

type Data = {
    habits?: GroupedHabit[]
    habit?: CompleteHabit | null
    count?: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { params } = req.query
    if (req.method === "POST") {
    } else if (req.method === "GET") {
        if (params) {
            if (params.length === 3) {
                const [programId, userId, role] = params as string[]
                const habits = await getHabits(userId, programId, role as Role)
                res.status(200).json({ habits })
            }
        } else {
            res.status(404).json({ habit: null })
        }
    } else if (req.method === "DELETE") {
        const { slug, creatorId } = req.body
        const { count } = await prisma.habit.deleteMany({
            where: { slug, creatorId },
        })
        res.status(404).json({ count })
    }
}

export default handler
