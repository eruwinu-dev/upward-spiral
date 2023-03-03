import { format } from "date-fns"

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const toDateString = (date: Date) => format(date, "MMM d, yyyy")
