import { HabitFrequency } from "@prisma/client"

type CompletionData = {
    count: number
    week: number
    frequency: HabitFrequency
    duration?: number
}

export const getCompletion = ({
    count,
    week,
    frequency,
    duration,
}: CompletionData) =>
    frequency === "DAILY"
        ? (count / 7) * 100
        : frequency === "WEEKLY"
        ? count * 100
        : frequency === "BIWEEKLY"
        ? week % 2 === 1
            ? count * 100
            : undefined
        : frequency === "CUSTOM"
        ? !duration
            ? undefined
            : week < duration
            ? 0
            : count * 100
        : undefined
