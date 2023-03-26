import { Params } from "@/types/params"

export const parsePath = (params: string | string[] | undefined): Params => {
    const values = Array.isArray(params)
        ? params
        : typeof params === "string"
        ? params.split("/")
        : []

    const program = values[0] === "program" ? values[1] : undefined
    const habit = values[2] === "habit" ? values[3] : undefined
    const week =
        values[2] === "week"
            ? values[3]
            : values[4] === "week"
            ? values[5]
            : undefined
    const day = values[6] === "day" ? values[7] : undefined
    const trainee =
        values[2] === "trainee"
            ? values[3]
            : values[8] === "trainee"
            ? values[9]
            : undefined
    const view =
        values[8] === "view"
            ? values[9]
            : values[10] === "view"
            ? values[11]
            : undefined

    return {
        program,
        habit,
        week,
        day,
        trainee,
        view,
    }
}
