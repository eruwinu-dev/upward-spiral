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
import { SortedLog } from "@/types/log"
import { toDateString } from "@/utils/dates"

type Data = {
    logs: SortedLog[]
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
        start: addWeeks(start, week - 1),
        end: addDays(addWeeks(start, week), -1),
    })

    const weeklyTarget =
        frequency === "WEEKLY"
            ? datesOfWeek[(repeatDay as number) - 1]
            : frequency === "BIWEEKLY"
            ? week % 2 === 1
                ? datesOfWeek[(repeatDay as number) - 1]
                : undefined
            : undefined

    const logsByDay: SortedLog[] = datesOfWeek.map((date) => ({
        date,
        dateString: toDateString(date),
        isToday: isToday(date),
        isLapsed:
            frequency === "DAILY"
                ? differenceInCalendarDays(date, today) < 1
                : frequency === "WEEKLY" || frequency === "BIWEEKLY"
                ? weeklyTarget && isSameDay(weeklyTarget, date)
                    ? today > weeklyTarget
                    : false
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

    res.status(200).json({ logs: logsByDay })
}

export default handler
