import { Habit, Log } from "@prisma/client"

export type LogSlot = {
    week: number
    day: number
    date: Date
    log: Log[]
}

export type GroupedLog = {
    id: string
    logs: Log[]
}

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

export type LogWithHabit = Log & {
    habit: Habit
}

export type SimpleLog = {
    id: string
    message: string
    createdAt: string
}

export type FormattedLog = {
    habitSlug: string
    message: string
    log?: SimpleLog
}
