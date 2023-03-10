import { Timezone } from "@/types/timezone"
import { addMinutes } from "date-fns"

export const utcToTimezone = (date: Date, timeZone: string) =>
    new Date(date.toLocaleString("en-US", { timeZone }))

export const timezones: Timezone[] = [
    {
        offset: "GMT-11:00",
        name: "Pacific/Niue",
    },
    {
        offset: "GMT-10:00",
        name: "America/Adak",
    },
    {
        offset: "GMT-09:00",
        name: "America/Anchorage",
    },
    {
        offset: "GMT-08:00",
        name: "America/Los_Angeles",
    },
    {
        offset: "GMT-07:00",
        name: "America/Denver",
    },
    {
        offset: "GMT-06:00",
        name: "America/Chicago",
    },
    {
        offset: "GMT-05:00",
        name: "America/New_York",
    },
    {
        offset: "GMT-04:30",
        name: "America/Caracas",
    },
    {
        offset: "GMT-04:00",
        name: "America/La_Paz",
    },
    {
        offset: "GMT-03:00",
        name: "America/Montevideo",
    },
    {
        offset: "GMT-02:00",
        name: "America/Noronha",
    },
    {
        offset: "GMT-01:00",
        name: "Atlantic/Cape_Verde",
    },
    {
        offset: "UTC",
        name: "UTC",
    },
    {
        offset: "GMT+01:00",
        name: "Europe/Amsterdam",
    },
    {
        offset: "GMT+02:00",
        name: "Africa/Cairo",
    },
    {
        offset: "GMT+03:00",
        name: "Asia/Riyadh",
    },
    {
        offset: "GMT+04:00",
        name: "Asia/Dubai",
    },
    {
        offset: "GMT+05:00",
        name: "Asia/Tashkent",
    },
    {
        offset: "GMT+06:00",
        name: "Asia/Dhaka",
    },
    {
        offset: "GMT+07:00",
        name: "Asia/Bangkok",
    },
    {
        offset: "GMT+08:00",
        name: "Asia/Hong_Kong",
    },
    {
        offset: "GMT+09:00",
        name: "Asia/Tokyo",
    },
    {
        offset: "GMT+10:00",
        name: "Australia/Brisbane",
    },
    {
        offset: "GMT+11:00",
        name: "Asia/Vladivostok",
    },
    {
        offset: "GMT+12:00",
        name: "Pacific/Auckland",
    },
    {
        offset: "GMT+14:00",
        name: "Pacific/Kiritimati",
    },
]
