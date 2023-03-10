import prisma from "@/lib/prisma"
import { HabitFrequency } from "@prisma/client"
import { addDays, addWeeks } from "date-fns"

export type GetLogsData = {
    habitId: string
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
    timezone?: string
}

export type GetLogByHabitData = {
    userId: string
    habitId: string
    startDate?: Date
    frequency?: HabitFrequency
    repeatDay?: number
    duration?: number
}

export const getLogsByHabit = async ({
    userId,
    habitId,
}: GetLogByHabitData) => {
    const logs = await prisma.log.findMany({
        where: { habitId, userId },
    })
    return logs
}

export const getLogsByWeek = async ({
    habitId,
    userId,
    week,
    startDate,
}: GetLogsData) => {
    const logs = await prisma.log.findMany({
        where: {
            habitId,
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
    const date = addDays(new Date(startDate), (week - 1) * 7 + (day - 1))

    const lowerBoundDate = date
    const upperBoundDate = addDays(date, 1)

    const habitAndLog = await prisma.habit.findFirst({
        where: {
            slug: habitSlug,
        },
        select: {
            slug: true,
            message: true,
            logs: {
                take: 1,
                where: {
                    userId,
                    createdAt: {
                        gte: lowerBoundDate,
                        lt: upperBoundDate,
                    },
                },
            },
        },
    })

    return habitAndLog
}
