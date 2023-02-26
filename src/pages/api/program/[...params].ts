import { getProgram, getPrograms } from "@/lib/program/getPrograms"
import { CompleteProgram } from "@/types/program"
import { Program, Role } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    newProgram?: Program | null
    program?: CompleteProgram | null
    programs?: CompleteProgram[]
    count?: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { params } = req.query
    if (req.method === "POST") {
        const { trainerId, ...data } = req.body
        const newProgram = await prisma.program.create({
            data: {
                ...data,
                trainer: {
                    connect: { id: trainerId },
                },
            },
        })
        res.status(200).json({ newProgram })
    } else if (req.method === "GET") {
        if (params) {
            if (params.length === 2) {
                const userId = params[0]
                const role = params[1] as Role
                const programs = await getPrograms(userId, role)
                res.status(200).json({ programs })
            } else if (params.length === 3) {
                const userId = params[0]
                const role = params[1] as Role
                const slug = params[2]
                const program = await getProgram(userId, slug, role)
                res.status(200).json({ program })
            }
        } else {
            res.status(404).json({ program: null })
        }
    } else if (req.method === "DELETE") {
        const { slug, trainerId } = req.body
        const { count } = await prisma.program.deleteMany({
            where: { slug, trainerId, type: "CUSTOM" },
        })
        res.status(200).json({ count })
    } else if (req.method === "PATCH") {
        const { programId, trainerId, traineeId } = req.body
    }
}

export default handler
