import { HabitFrequency, HabitMetric } from "@prisma/client"

export const frequencies = ["DAILY", "WEEKLY", "BIWEEKLY", "CUSTOM"] as const

export const metrics = ["RATING", "NUMBER", "MESSAGE", "CHECK"] as const

export type HabitSchema = {
    title?: string
    message?: string
    metric?: HabitMetric | ""
    habitTypeId?: string
    frequency?: HabitFrequency | ""
    repeatDay?: number | ""
    duration?: number | ""
}

export type HabitSchemaIndices =
    | "title"
    | "message"
    | "metric"
    | "habitTypeId"
    | "frequency"
    | "repeatDay"
    | "duration"
