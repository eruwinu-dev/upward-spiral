import { matchParams } from "@/utils/parameters"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useGetProgram } from "../program/useGetProgram"

export const useGetDates = () => {
    const { data: program } = useGetProgram()

    const {
        query: { params, week: programWeek, day: programDay },
        pathname,
    } = useRouter()

    const paramsMap = matchParams(params)

    const week = pathname.endsWith("[...params]")
        ? Number(paramsMap.get("week")) || 0
        : Number(programWeek)

    const day = pathname.endsWith("[...params]")
        ? Number(paramsMap.get("day")) || 0
        : Number(programDay)

    return useQuery<string[], Error>({
        queryKey: ["user", "program", program?.slug, "day", week, day],
        queryFn: async () => {
            const result = await fetch(`/api/date/get`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    createdAt: program?.createdAt,
                    week,
                    day,
                }),
            })
            const dateInfo = await result.json()
            return dateInfo
        },
        enabled: !!program?.id,
        refetchOnWindowFocus: false,
    })
}
