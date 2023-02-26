import prisma from "@/lib/prisma"
import { groupBy } from "@/utils/groupBy"
import { addWeeks } from "date-fns"

export type GetLogData = {
    createdAt: string
    week: number
    programId: string
    userId: string
}

export const getLogs = async ({
    createdAt,
    week,
    programId,
    userId,
}: GetLogData) => {
    const logs = await prisma.log.findMany({
        where: {
            createdAt: {
                gte: addWeeks(new Date(createdAt), week - 1),
                lte: addWeeks(new Date(createdAt), week),
            },
            habit: {
                program: {
                    id: programId,
                    traineeId: userId,
                },
            },
        },
        include: { habit: true },
    })
    return groupBy(logs, (i) => i.habit.slug)
}
