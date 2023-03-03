import prisma from "@/lib/prisma"
import { HabitFrequency } from "@prisma/client"
import { addDays, addWeeks, set } from "date-fns"

export type GetLogsData = {
    id: string
    userId: string
    week: number
    startDate: Date
    frequency: HabitFrequency
    repeatDay?: number
}

export type GetLogData = {
    userId: string
    habitSlug: string
    week: number
    day: number
    startDate: Date
}

export const getLogs = async ({ id, userId, week, startDate }: GetLogsData) => {
    const logs = await prisma.log.findMany({
        where: {
            habitId: id,
            userId,
            createdAt: {
                gte: addWeeks(new Date(startDate), week - 1),
                lte: addWeeks(new Date(startDate), week),
            },
        },
    })
    return logs
}

export const getLog = async ({
    userId,
    habitSlug,
    week,
    day,
    startDate,
}: GetLogData) => {
    const lowerBoundDate = set(
        addDays(new Date(startDate), (week - 1) * 7 + (day - 1)),
        { hours: 0, minutes: 0, seconds: 0 }
    )
    const upperBoundDate = set(
        addDays(new Date(startDate), (week - 1) * 7 + (day - 1)),
        { hours: 23, minutes: 59, seconds: 59 }
    )

    const formattedLog = await prisma.habit.findFirst({
        where: {
            slug: habitSlug,
        },
        select: {
            slug: true,
            message: true,
            logs: {
                where: {
                    userId,
                    createdAt: {
                        lte: upperBoundDate,
                        gte: lowerBoundDate,
                    },
                },
            },
        },
    })

    return formattedLog
}
