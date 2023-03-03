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

export type FormattedLog = {
    slug: string
    message: string
    logs: Log[]
}
