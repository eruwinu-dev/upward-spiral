import { getHabits } from "@/lib/habit/getHabits"
import { GroupedHabit } from "@/types/habit"
import { Role } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    habits: GroupedHabit[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId, programId, role } = req.body

    const habits = await getHabits(userId, programId, role as Role)
    res.status(200).json({ habits: habits as GroupedHabit[] })
}

export default handler
