import { Role } from "@prisma/client"
import { NextRouter, useRouter } from "next/router"

type Params = {
    program?: string
    week?: string
    day?: string
    habit?: string
    trainee?: string
    view?: string
}

export interface PageRender extends NextRouter {
    role: Role
    render: "static" | "dynamic"
    renderPath: (params: Params) => string
    program?: string
    week?: string
    day?: string
    habit?: string
    trainee?: string
    view?: string
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
            trainee: traineeQuery,
            view: viewQuery,
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
    const habitParams = values[2] === "habit" ? values[3] : undefined
    const weekParams =
        values[2] === "week"
            ? values[3]
            : values[4] === "week"
            ? values[5]
            : undefined
    const dayParams = values[6] === "day" ? values[7] : undefined
    const traineeParams = values[2] === "trainee" ? values[3] : undefined
    const viewParams = values[8] === "view" ? values[9] : undefined

    const program =
        render === "static" ? (programQuery as string) : programParams
    const week = render === "static" ? (weekQuery as string) : weekParams
    const day = render === "static" ? (dayQuery as string) : dayParams
    const habit = render === "static" ? (habitQuery as string) : habitParams
    const view = render === "static" ? (viewQuery as string) : viewParams
    const trainee =
        render === "static" ? (traineeQuery as string) : traineeParams

    const renderPath = ({
        program,
        week,
        day,
        habit,
        trainee,
        view,
    }: Params) => {
        const weekDayChunk =
            `${week ? `/week/${week}` : ""}` + `${day ? `/day/${day}` : ""}`
        const viewChunk = `${view ? `/view/${view}` : ""}`

        console.log(program)

        return (
            `/${role.toLowerCase()}` +
            `${program ? `/program/${program}` : ""}` +
            `${
                habit
                    ? `${habit ? `/habit/${habit}` : ""}` +
                      weekDayChunk +
                      viewChunk
                    : trainee
                    ? `${trainee ? `/trainee/${trainee}` : ""}` +
                      weekDayChunk +
                      viewChunk
                    : role === "USER"
                    ? `${week ? `/week/${week}` : ""}`
                    : ""
            }`
        )
    }

    return {
        ...router,
        role,
        render,
        renderPath,
        program,
        week,
        day,
        habit,
        trainee,
        view,
    }
}
