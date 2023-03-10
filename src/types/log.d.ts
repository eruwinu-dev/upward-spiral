import { Habit, Log } from "@prisma/client"

export type HabitLogSlot = {
    date: Date
    week: number
    day: number
    dateString: string
    isTarget: boolean
    isLapsed: boolean
    isToday: boolean
    log?: Log
}

export type LogSummary = {
    slots: HabitLogSlot[]
    lapsed: number
    logged: number
    total: number
}

export type ViewLog = {
    habitSlug: string
    question: string
    hasLog: boolean
    message?: string
    logDateString?: string
}
