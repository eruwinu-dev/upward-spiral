import { NextApiRequest, NextApiResponse } from "next"

import { getLogsByHabit } from "@/lib/log/getLogs"
import {
    addWeeks,
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    eachDayOfInterval,
    eachWeekOfInterval,
    getDay,
    getWeek,
    isSameDay,
    isToday,
    set,
} from "date-fns"
import { HabitLogSlot, LogSummary } from "@/types/log"
import { toDateString } from "@/utils/dates"
import { HabitFrequency } from "@prisma/client"
import { utcToTimezone } from "@/utils/timezone"

type RepeatDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined

interface GetLogsRequest extends NextApiRequest {
    body: {
        habitId: string
        startDate: Date
        frequency: HabitFrequency
        repeatDay?: number
        duration?: number
    }
}

const handler = async (
    req: GetLogsRequest,
    res: NextApiResponse<LogSummary>
) => {
    const { habitId, frequency, repeatDay, duration, startDate } = req.body

    const userId = req.cookies["userId"] || ""
    const timezone = req.cookies["timezone"] || "UTC"

    const logs = await getLogsByHabit({ habitId, userId })

    const start = utcToTimezone(new Date(startDate), timezone)

    const end = set(addWeeks(start, 15), {
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const today = utcToTimezone(new Date(Date.now()), timezone)

    const total =
        frequency === "DAILY"
            ? differenceInCalendarDays(end, start)
            : frequency === "WEEKLY"
            ? differenceInCalendarWeeks(end, start)
            : frequency === "BIWEEKLY"
            ? Math.ceil(differenceInCalendarWeeks(end, start) / 2)
            : (duration as number)

    const targetDates = (
        frequency === "DAILY"
            ? eachDayOfInterval({
                  start,
                  end: today,
              })
            : frequency === "WEEKLY" || frequency === "BIWEEKLY"
            ? eachWeekOfInterval(
                  { start, end: today },
                  { weekStartsOn: repeatDay as RepeatDay }
              )
                  .filter((date) => date >= start)
                  .filter((date, index) =>
                      frequency === "WEEKLY"
                          ? true
                          : frequency === "BIWEEKLY"
                          ? index % 2 === 0
                          : false
                  )
            : []
    ).sort((dateA, dateB) => differenceInCalendarDays(dateB, dateA))

    const slots: HabitLogSlot[] = targetDates.map((date) => {
        return {
            date,
            week:
                getWeek(date, { weekStartsOn: 1 }) -
                getWeek(start, { weekStartsOn: 1 }) +
                1,
            day: getDay(date) === 0 ? 7 : getDay(date),
            dateString: toDateString(date),
            isTarget: true,
            isLapsed:
                !logs.find((log) => isSameDay(new Date(log.createdAt), date)) &&
                differenceInCalendarDays(date, today) < 0,
            isToday: isToday(date),
            log: logs.find((log) => isSameDay(new Date(log.createdAt), date)),
        }
    })

    const lapsed = slots.filter((log) => log.isLapsed).length
    const logged = logs.length

    res.status(200).json({
        slots,
        total,
        lapsed,
        logged,
    })
}

export default handler
