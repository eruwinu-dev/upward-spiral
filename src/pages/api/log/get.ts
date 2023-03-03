import { NextApiRequest, NextApiResponse } from "next"

import { GetLogsData, getLogs } from "@/lib/log/getLogs"
import { range } from "@/utils/range"
import {
    addDays,
    differenceInCalendarDays,
    isSameDay,
    isSameWeek,
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

    const logs = await getLogs({
        id,
        userId,
        week,
        startDate,
        frequency,
        repeatDay,
    })

    const today = addDays(
        set(new Date(Date.now()), {
            hours: 0,
            minutes: 0,
            seconds: 0,
        }),
        0
    )

    const logsMap: SortedLog[] = range(1, 8).map((day) => {
        const date = addDays(new Date(startDate), (week - 1) * 7 + (day - 1))
        const targetDate = addDays(
            new Date(startDate),
            (week - 1) * 7 + (repeatDay as number)
        )

        const isDateToday = isSameDay(date, today)
        if (frequency === "DAILY") {
            return {
                date,
                dateString: toDateString(date),
                isToday: isDateToday,
                isLapsed: differenceInCalendarDays(date, today) < 1,
                log: logs.find((log) =>
                    isSameDay(new Date(log.createdAt), date)
                ),
            }
        } else if (frequency === "WEEKLY") {
            return {
                date,
                dateString: toDateString(date),
                isToday: isDateToday,
                isLapsed:
                    isSameWeek(today, targetDate) &&
                    differenceInCalendarDays(date, targetDate) < 1,
                log:
                    repeatDay === day
                        ? logs.find((log) =>
                              isSameDay(new Date(log.createdAt), targetDate)
                          )
                        : undefined,
            }
        } else if (frequency === "BIWEEKLY") {
            return {
                date,
                dateString: toDateString(date),
                isToday: isDateToday,
                isLapsed:
                    isSameWeek(today, targetDate) &&
                    differenceInCalendarDays(today, targetDate) < 1,
                log:
                    (week - 1) % 2 === 1
                        ? undefined
                        : repeatDay === day
                        ? logs.find((log) =>
                              isSameDay(new Date(log.createdAt), targetDate)
                          )
                        : undefined,
            }
        } else {
            return {
                date,
                dateString: toDateString(date),
                isToday: isDateToday,
                isLapsed: true,
                log: undefined,
            }
        }
    })

    res.status(200).json({ logs: logsMap })
}

export default handler
