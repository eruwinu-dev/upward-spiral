import type { NextApiRequest, NextApiResponse } from "next"

import { User } from "@prisma/client"
import { getUser } from "@/lib/user/getUser"

type Data = {
    user: User | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email } = req.body
    const user = await getUser(email)
    res.status(200).json({ user })
}

export default handler
