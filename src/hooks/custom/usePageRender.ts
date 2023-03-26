import { Role } from "@prisma/client"
import { Params } from "@/types/params"
import { NextRouter, useRouter } from "next/router"
import { parsePath } from "@/utils/parsePath"

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

    const {
        program: programParams,
        habit: habitParams,
        week: weekParams,
        day: dayParams,
        trainee: traineeParams,
        view: viewParams,
    } = parsePath(params)

    const program =
        render === "static" ? (programQuery as string) : programParams
    const habit = render === "static" ? (habitQuery as string) : habitParams
    const week = render === "static" ? (weekQuery as string) : weekParams
    const day = render === "static" ? (dayQuery as string) : dayParams
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
        const programChunk = `${program ? `/program/${program}` : ""}`
        const weekDayChunk =
            `${week ? `/week/${week}` : ""}` + `${day ? `/day/${day}` : ""}`
        const habitChunk = `${habit ? `/habit/${habit}` : ""}`
        const traineeChunk = `${trainee ? `/trainee/${trainee}` : ""}`
        const viewChunk = `${view ? `/view/${view}` : ""}`

        const renderedPath =
            `/${role.toLowerCase()}` +
            programChunk +
            (habit ? habitChunk : traineeChunk) +
            weekDayChunk +
            (trainee && habit ? traineeChunk : "") +
            viewChunk

        return renderedPath
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
