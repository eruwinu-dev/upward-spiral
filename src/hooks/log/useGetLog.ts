import { ViewLog } from "@/types/log"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"
import { useGetProgram } from "../program/useGetProgram"

export const useGetLog = () => {
    const { role, week, day, habit } = usePageRender()
    const { data: program } = useGetProgram()

    return useQuery<ViewLog, Error>({
        queryKey: [
            role.toLowerCase(),
            "program",
            program?.slug,
            "week",
            week,
            "day",
            day,
            "habit",
            habit,
            "log",
            "view",
        ],
        queryFn: async () => {
            const result = await fetch(`/api/log/get/one`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    habitSlug: habit,
                    startDate: program?.startDate,
                    week,
                    day,
                }),
            })
            const { log } = await result.json()
            return log
        },
        enabled: !!program?.id && !!habit && !!day && !!week,
        refetchOnWindowFocus: false,
    })
}
