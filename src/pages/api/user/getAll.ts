import { getUsers } from "@/lib/user/getUsers"
import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

type Data = {
    users: User[] | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId } = req.body
    const users = await getUsers(userId)

    res.status(200).json({ users })
}

export default handler
