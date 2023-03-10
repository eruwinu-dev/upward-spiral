import { getPrograms } from "@/lib/program/getPrograms"
import { Program } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    programs: Program[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { role, slug } = req.body

    const userId = req.cookies["userId"] || ""

    const programs = await getPrograms({ userId, slug, role })

    res.status(200).json({ programs })
}

export default handler
