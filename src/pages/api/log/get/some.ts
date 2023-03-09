import { NextApiRequest, NextApiResponse } from "next"

import { GetLogsData, getLogsByWeek } from "@/lib/log/getLogs"
import {
    addDays,
    addWeeks,
    differenceInCalendarDays,
    eachDayOfInterval,
    isSameDay,
    isToday,
    set,
} from "date-fns"
import { HabitLogSlot } from "@/types/log"
import { toDateString } from "@/utils/dates"

type Data = {
    slots: HabitLogSlot[]
}

interface GetLogsRequest extends NextApiRequest {
    body: GetLogsData
}

const handler = async (req: GetLogsRequest, res: NextApiResponse<Data>) => {
    const { id, userId, week, startDate, frequency, repeatDay } = req.body

    const logs = await getLogsByWeek({
        id,
        userId,
        week,
        startDate,
        frequency,
        repeatDay,
    })

    const start = new Date(startDate)

    const today = set(new Date(Date.now()), {
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const datesOfWeek = eachDayOfInterval({
        start: addDays(addWeeks(start, week - 1), 0),
        end: addDays(addWeeks(start, week), -1),
    })

    const weeklyTarget =
        typeof repeatDay !== "undefined"
            ? frequency === "WEEKLY"
                ? repeatDay === 0
                    ? datesOfWeek[datesOfWeek.length - 1]
                    : datesOfWeek[repeatDay - 1]
                : frequency === "BIWEEKLY"
                ? week % 2 === 1
                    ? repeatDay === 0
                        ? datesOfWeek[datesOfWeek.length - 1]
                        : datesOfWeek[repeatDay - 1]
                    : undefined
                : undefined
            : undefined

    const slots: HabitLogSlot[] = datesOfWeek.map((date, index) => ({
        date,
        week,
        day: index + 1,
        dateString: toDateString(date),
        isToday: isToday(date),
        isLapsed:
            frequency === "DAILY"
                ? differenceInCalendarDays(date, today) < 0
                : frequency === "WEEKLY" || frequency === "BIWEEKLY"
                ? weeklyTarget && isSameDay(weeklyTarget, date)
                    ? today > weeklyTarget
                    : false
                : false,
        isTarget:
            frequency === "DAILY"
                ? true
                : frequency === "WEEKLY" || frequency === "BIWEEKLY"
                ? weeklyTarget
                    ? isSameDay(weeklyTarget, date)
                    : false
                : frequency === "CUSTOM"
                ? false
                : false,
        log:
            frequency === "DAILY"
                ? logs.find((log) => isSameDay(new Date(log.createdAt), date))
                : frequency === "WEEKLY" || frequency === "BIWEEKLY"
                ? weeklyTarget && isSameDay(weeklyTarget, date)
                    ? logs.find((log) =>
                          isSameDay(new Date(log.createdAt), weeklyTarget)
                      )
                    : undefined
                : undefined,
    }))

    res.status(200).json({ slots })
}

export default handler
