import { GetHabitData, getHabits } from "@/lib/habit/getHabits"
import { GroupedHabit } from "@/types/habit"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    groups: GroupedHabit[]
}

export interface GetHabitRequest extends NextApiRequest {
    body: GetHabitData
}

const handler = async (req: GetHabitRequest, res: NextApiResponse<Data>) => {
    const { userId, programId, role } = req.body

    const groups = await getHabits({ userId, programId, role })
    res.status(200).json({ groups })
}

export default handler
