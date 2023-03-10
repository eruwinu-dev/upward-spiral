import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    count: number
}
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email, name, timezone } = req.body

    res.setHeader("Set-Cookie", [`timezone=${timezone}; Max-Age=36000; Path=/`])

    const { count } = await prisma.user.updateMany({
        where: { email },
        data: { name, timezone },
    })

    res.status(200).json({ count })
}

export default handler
