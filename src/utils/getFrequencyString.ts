import { HabitFrequency } from "@prisma/client"
import { daysOfWeek } from "./dates"

export const getFrequencyString = (
    frequency: HabitFrequency,
    repeatDay: number | null
) => {
    if (["WEEKLY", "BIWEEKLY"].includes(frequency) && !repeatDay) return ""
    if (frequency === "DAILY") return "Daily"
    if (frequency === "WEEKLY")
        return `Every ${daysOfWeek[(repeatDay as number) - 1]}`
    if (frequency === "BIWEEKLY")
        return `Every other ${daysOfWeek[(repeatDay as number) - 1]}`
}
