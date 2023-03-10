import { getHabit, GetHabitData } from "@/lib/habit/getHabits"
import { Habit } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    habit: Habit | null
}

export interface GetHabitRequest extends NextApiRequest {
    body: GetHabitData
}

const handler = async (req: GetHabitRequest, res: NextApiResponse<Data>) => {
    const { programId, role, habitSlug } = req.body

    const userId = req.cookies["userId"] || ""

    const habit = await getHabit({ userId, programId, role, habitSlug })
    res.status(200).json({ habit })
}

export default handler
