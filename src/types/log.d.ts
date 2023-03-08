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

export type SortedLog = {
    date: Date
    dateString: string
    isToday: boolean
    isLapsed: boolean
    log?: Log
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

export type StatusLogs = {
    logs: Log[]
    lapsed: number
    total: number
    dates: Date[]
    logsByDate: StatusLog[]
}

export type StatusLog = {
    date: Date
    dateString: string
    isToday: boolean
    log?: Log
}
