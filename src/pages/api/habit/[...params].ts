import { NextApiRequest, NextApiResponse } from "next"

import { GroupedHabit } from "@/types/habit"
import { Habit, Role } from "@prisma/client"
import { getHabit, getHabits } from "@/lib/habit/getHabits"

import prisma from "@/lib/prisma"
import { slugify } from "@/utils/slugify"

type Data = {
    habits?: GroupedHabit[]
    habit?: Habit | null
    count?: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { params } = req.query
    if (req.method === "POST") {
    } else if (req.method === "GET") {
        if (params) {
            if (params.length === 3) {
                res.status(200).json({})
            } else if (params.length === 4) {
                const [programId, userId, role, habitSlug] = params as string[]
                const habit = await getHabit(
                    userId,
                    programId,
                    habitSlug,
                    role as Role
                )
                res.status(200).json({ habit })
            }
        } else {
            res.status(404).json({ habit: null })
        }
    } else if (req.method === "PATCH") {
        const { title, habitTypeId, creatorId, slug, ...data } = req.body

        const { count } = await prisma.habit.updateMany({
            where: { slug, creatorId },
            data: {
                ...data,
                title,
                slug: slugify(title),
                habitTypeId,
            },
        })
        res.status(404).json({ count })
    } else if (req.method === "DELETE") {
        const { slug, creatorId } = req.body
        const { count } = await prisma.habit.deleteMany({
            where: { slug, creatorId },
        })
        res.status(404).json({ count })
    }
}

export default handler
