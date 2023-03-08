import { NextApiRequest, NextApiResponse } from "next"

import { getLogsByHabit, GetLogByHabitData } from "@/lib/log/getLogs"
import {
    addDays,
    addWeeks,
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    eachDayOfInterval,
    eachWeekOfInterval,
    isSameDay,
    isSameWeek,
    isToday,
    set,
} from "date-fns"
import { StatusLog, StatusLogs } from "@/types/log"
import { toDateString } from "@/utils/dates"

type Data = StatusLogs

type RepeatDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined

interface GetLogsRequest extends NextApiRequest {
    body: GetLogByHabitData
}

const handler = async (req: GetLogsRequest, res: NextApiResponse<Data>) => {
    const { habitId, userId, frequency, repeatDay, duration, startDate } =
        req.body

    const logs = await getLogsByHabit({ habitId, userId })

    const start = new Date(startDate as Date)
    const end = set(addWeeks(start, 15), {
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const today = addDays(
        set(new Date(Date.now()), {
            hours: 23,
            minutes: 59,
            seconds: 59,
        }),
        1
    )

    const total =
        frequency === "DAILY"
            ? differenceInCalendarDays(end, start)
            : frequency === "WEEKLY"
            ? differenceInCalendarWeeks(end, start)
            : frequency === "BIWEEKLY"
            ? Math.ceil(differenceInCalendarWeeks(end, start) / 2)
            : (duration as number)

    const logged = logs.filter((log) => !isToday(log.createdAt)).length

    const weeklyTargets = eachWeekOfInterval(
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

    const weeklyLogs = weeklyTargets.map((date) =>
        logs.find((log) => isSameWeek(new Date(log.createdAt), date))
    )

    const targetDates = (
        frequency === "DAILY"
            ? eachDayOfInterval({
                  start,
                  end: addDays(today, -1),
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

    const logsByDate: StatusLog[] = targetDates.map((date) => ({
        date,
        dateString: toDateString(date),
        log: logs.find((log) => isSameDay(new Date(log.createdAt), date)),
        isToday: isToday(date)
    }))

    const lapsed =
        frequency === "DAILY"
            ? differenceInCalendarDays(today, start) - logged - 1
            : frequency === "WEEKLY" || frequency === "BIWEEKLY"
            ? weeklyLogs.filter((log) => typeof log === "undefined").length
            : 1

    res.status(200).json({
        logs,
        lapsed,
        total,
        dates: targetDates,
        logsByDate,
    })
}

export default handler
