import { getProgram } from "@/lib/program/getPrograms"
import { Program } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    program: Program | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { slug, role } = req.body

    const userId = req.cookies["userId"] || ""

    const program = await getProgram({ userId, slug, role })

    res.status(200).json({ program })
}

export default handler
