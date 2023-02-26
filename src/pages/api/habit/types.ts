import type { NextApiRequest, NextApiResponse } from "next"

import { HabitType } from "@prisma/client"
import { getHabitTypes } from "@/lib/habit/getHabitTypes"

type Data = {
    types: HabitType[]
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { role } = req.body
    const types = role === "USER" ? [] : await getHabitTypes()

    res.status(200).json({ types })
}

export default handler
