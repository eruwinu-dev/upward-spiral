export const matchParams = (params: string[] | string | undefined) => {
    if (!params || typeof params === "string")
        return new Map<string, string | undefined>([])
    const [preSlug, slug, preWeek, week, preDay, day] = params
    const paramsMap = new Map<string, string | undefined>([
        ["preSlug", preSlug],
        ["slug", slug],
        ["preWeek", preWeek],
        ["week", week],
        ["preDay", preDay],
        ["day", day],
    ])
    return paramsMap
}
