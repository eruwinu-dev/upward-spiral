import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    count: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email, ...data } = req.body

    const { count } = await prisma.user.updateMany({
        where: { email },
        data,
    })

    res.status(200).json({ count })
}

export default handler
