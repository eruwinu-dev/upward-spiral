import { NextApiRequest, NextApiResponse } from "next"

import { Log } from "@prisma/client"

import prisma from "@/lib/prisma"

type Data = {
    log: Log
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { message, habitId, userId } = req.body

    const log = await prisma.log.create({
        data: {
            message,
            habit: { connect: { id: habitId } },
            user: { connect: { id: userId } },
        },
    })

    res.status(200).json({ log })
}

export default handler
