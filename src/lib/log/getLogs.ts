import prisma from "@/lib/prisma"
import { Habit, HabitFrequency } from "@prisma/client"
import { addDays, addWeeks } from "date-fns"
import { toDateTimeString } from "@/utils/dates"

export type GetLogsData = {
    id: string
    userId: string
    week: number
    startDate: Date
    frequency: HabitFrequency
    repeatDay?: number
    offset: number
}

export type GetLogData = {
    userId: string
    habitSlug: string
    week: number
    day: number
    startDate: Date
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
    id,
    userId,
    week,
    startDate,
}: GetLogsData) => {
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
    const date = addDays(new Date(startDate), (week - 1) * 7 + (day - 1))

    const lowerBoundDate = date
    const upperBoundDate = addDays(date, 1)

    const log = await prisma.habit.findFirst({
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

    const selectedLog = log
        ? log.logs.length
            ? log.logs[0]
            : undefined
        : undefined

    const formattedLog = log
        ? {
              habitSlug: log.slug,
              message: log.message,
              log: selectedLog
                  ? {
                        id: selectedLog.id,
                        message: selectedLog.message,
                        createdAt: toDateTimeString(
                            new Date(selectedLog.createdAt)
                        ),
                    }
                  : undefined,
          }
        : null

    return formattedLog
}
