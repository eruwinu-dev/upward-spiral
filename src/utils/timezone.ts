import { Timezone } from "@/types/timezone"
import { addMinutes } from "date-fns"

export const offsetDate = (offset: number, date: Date) =>
    addMinutes(new Date(date.toUTCString()), offset - 4)

export const timezones: Timezone[] = [
    {
        offset: "GMT-12:00",
        name: "Etc/GMT-12",
        amount: -12,
    },
    {
        offset: "GMT-11:00",
        name: "Pacific/Midway",
        amount: -11,
    },
    {
        offset: "GMT-10:00",
        name: "America/Adak",
        amount: -10,
    },
    {
        offset: "GMT-09:00",
        name: "America/Anchorage",
        amount: -9,
    },
    {
        offset: "GMT-08:00",
        name: "America/Los_Angeles",
        amount: -8,
    },
    {
        offset: "GMT-07:00",
        name: "America/Denver",
        amount: -7,
    },
    {
        offset: "GMT-06:00",
        name: "America/Chicago",
        amount: -6,
    },
    {
        offset: "GMT-05:00",
        name: "America/New_York",
        amount: -5,
    },
    {
        offset: "GMT-04:30",
        name: "America/Caracas",
        amount: -4.5,
    },
    {
        offset: "GMT-04:00",
        name: "America/La_Paz",
        amount: -4,
    },
    {
        offset: "GMT-03:30",
        name: "America/St_Johns",
        amount: -3.5,
    },
    {
        offset: "GMT-03:00",
        name: "America/Montevideo",
        amount: -3,
    },
    {
        offset: "GMT-02:00",
        name: "America/Noronha",
        amount: -2,
    },
    {
        offset: "GMT-01:00",
        name: "Atlantic/Cape_Verde",
        amount: -1,
    },
    {
        offset: "UTC",
        name: "UTC",
        amount: 0,
    },
    {
        offset: "GMT+01:00",
        name: "Europe/Amsterdam",
        amount: 1,
    },
    {
        offset: "GMT+02:00",
        name: "Africa/Cairo",
        amount: 2,
    },
    {
        offset: "GMT+03:00",
        name: "Asia/Riyadh89",
        amount: 3,
    },
    {
        offset: "GMT+03:30",
        name: "Asia/Tehran",
        amount: 3.5,
    },
    {
        offset: "GMT+04:00",
        name: "Asia/Dubai",
        amount: 4,
    },
    {
        offset: "GMT+04:30",
        name: "Asia/Kabul",
        amount: 4.5,
    },
    {
        offset: "GMT+05:00",
        name: "Asia/Tashkent",
        amount: 5,
    },
    {
        offset: "GMT+06:00",
        name: "Asia/Dhaka",
        amount: 6,
    },
    {
        offset: "GMT+07:00",
        name: "Asia/Bangkok",
        amount: 7,
    },
    {
        offset: "GMT+08:00",
        name: "Asia/Hong_Kong",
        amount: 8,
    },
    {
        offset: "GMT+09:00",
        name: "Asia/Tokyo",
        amount: 9,
    },
    {
        offset: "GMT+10:00",
        name: "Australia/Brisbane",
        amount: 10,
    },
    {
        offset: "GMT+11:00",
        name: "Asia/Vladivostok",
        amount: 11,
    },
    {
        offset: "GMT+12:00",
        name: "Pacific/Auckland",
        amount: 12,
    },
    {
        offset: "GMT+13:00",
        name: "Pacific/Tongatapu",
        amount: 13,
    },
    {
        offset: "GMT+14:00",
        name: "Pacific/Kiritimati",
        amount: 14,
    },
]
