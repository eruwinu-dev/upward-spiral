import { NextApiRequest, NextApiResponse } from "next"

import { getLogsByWeek } from "@/lib/log/getLogs"
import {
    addDays,
    addWeeks,
    differenceInCalendarDays,
    eachDayOfInterval,
    isSameDay,
} from "date-fns"
import { HabitLogSlot } from "@/types/log"
import { toDateString } from "@/utils/dates"
import { utcToTimezone } from "@/utils/timezone"
import { HabitFrequency } from "@prisma/client"

type Data = {
    slots: HabitLogSlot[]
}

interface GetLogsRequest extends NextApiRequest {
    body: {
        habitId: string
        week: number
        startDate: Date
        frequency: HabitFrequency
        repeatDay?: number
        traineeId: string
    }
}

const handler = async (req: GetLogsRequest, res: NextApiResponse<Data>) => {
    const { habitId, week, startDate, frequency, repeatDay, traineeId } =
        req.body

    const timezone = req.cookies["timezone"] || "UTC"

    const logs = await getLogsByWeek({
        habitId,
        userId: traineeId,
        week,
        startDate,
        frequency,
        repeatDay,
    })

    const start = utcToTimezone(new Date(startDate), timezone)
    const today = utcToTimezone(new Date(Date.now()), timezone)

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
        isToday: isSameDay(today, date),
        isLapsed:
            !logs.find((log) => isSameDay(new Date(log.createdAt), date)) &&
            (frequency === "DAILY"
                ? differenceInCalendarDays(date, today) < 0
                : frequency === "WEEKLY" || frequency === "BIWEEKLY"
                ? weeklyTarget && isSameDay(weeklyTarget, date)
                    ? today > weeklyTarget
                    : false
                : false),
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
