import { NextApiRequest, NextApiResponse } from "next"

import { getLogsByHabit, GetLogByHabitData } from "@/lib/log/getLogs"
import {
    addDays,
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

type RepeatDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined

interface GetLogsRequest extends NextApiRequest {
    body: GetLogByHabitData
}

const handler = async (
    req: GetLogsRequest,
    res: NextApiResponse<LogSummary>
) => {
    const { habitId, userId, frequency, repeatDay, duration, startDate } =
        req.body

    const logs = await getLogsByHabit({ habitId, userId })

    const start = new Date(startDate as Date)
    const end = set(addWeeks(start, 15), {
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const today = set(new Date(Date.now()), {
        hours: 23,
        minutes: 59,
        seconds: 59,
    })

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
            isLapsed: differenceInCalendarDays(date, today) < 0,
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
