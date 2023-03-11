import { HabitFrequency } from "@prisma/client"
import { daysOfWeek } from "./dates"

export const getFrequencyString = (
    frequency: HabitFrequency,
    repeatDay: number | null
) =>
    frequency === "DAILY"
        ? "Daily"
        : frequency === "WEEKLY"
        ? `Every ${daysOfWeek[repeatDay as number]}`
        : frequency === "BIWEEKLY"
        ? `Every other ${daysOfWeek[repeatDay as number]}`
        : frequency === "CUSTOM"
        ? "Custom Repeat"
        : ""
