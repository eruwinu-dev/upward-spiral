import { Role } from "@prisma/client"
import { NextRouter, useRouter } from "next/router"

type Params = {
    program?: string
    week?: string
    day?: string
    habit?: string
}

export interface PageRender extends NextRouter {
    role: Role
    render: "static" | "dynamic"
    renderPath: (params: Params) => string
    program?: string
    week?: string
    day?: string
    habit?: string
}

export const usePageRender = (): PageRender => {
    const router = useRouter()
    const {
        pathname,
        query: {
            params,
            program: programQuery,
            week: weekQuery,
            day: dayQuery,
            habit: habitQuery,
        },
    } = router
    const role: Role = pathname.startsWith("/user") ? "USER" : "TRAINER"
    const render: "static" | "dynamic" = pathname.endsWith("[...params]")
        ? "dynamic"
        : "static"

    const values = Array.isArray(params)
        ? params
        : typeof params === "string"
        ? params.split("/")
        : []

    const programParams = values[0] === "program" ? values[1] : undefined
    const weekParams =
        values[2] === "week"
            ? values[3]
            : values[4] === "week"
            ? values[5]
            : undefined
    const dayParams =
        values[4] === "day"
            ? values[5]
            : values[6] === "day"
            ? values[7]
            : undefined
    const habitParams =
        values[2] === "habit"
            ? values[3]
            : values[6] === "habit"
            ? values[7]
            : undefined

    const program =
        render === "static" ? (programQuery as string) : programParams
    const week = render === "static" ? (weekQuery as string) : weekParams
    const day = render === "static" ? (dayQuery as string) : dayParams
    const habit = render === "static" ? (habitQuery as string) : habitParams

    const renderPath = ({ program, week, day, habit }: Params) =>
        `/${role.toLowerCase()}` +
        `${program ? `/program/${program}` : ""}` +
        (role === "TRAINER" ? `${habit ? `/habit/${habit}` : ""}` : "") +
        (role !== "TRAINER" ? `${week ? `/week/${week}` : ""}` : "") +
        (role !== "TRAINER" ? `${day ? `/day/${day}` : ""}` : "") +
        (role !== "TRAINER" ? `${habit ? `/habit/${habit}` : ""}` : "")

    return {
        ...router,
        role,
        render,
        renderPath,
        program,
        week,
        day,
        habit,
    }
}
