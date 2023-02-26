import { getDayOfYear, getWeek } from "date-fns"

export type DateInfo = {
    week: number
    day: number
}

export const getDateInfo = (timestamp: number): DateInfo => {
    const week = getWeek(timestamp)
    const day = getDayOfYear(timestamp)
    return { week, day }
}
