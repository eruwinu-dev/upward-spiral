import { FormattedLog } from "@/types/log"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"
import { useGetProgram } from "../program/useGetProgram"
import { useGetUser } from "../user/useGetUser"

export const useGetLog = () => {
    const { role, week, day, habit } = usePageRender()
    const { data: user } = useGetUser()
    const { data: program } = useGetProgram()

    return useQuery<FormattedLog | null, Error>({
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
                    userId: user?.id,
                    habitSlug: habit,
                    startDate: program?.startDate,
                    week,
                    day,
                }),
            })
            const { formattedLog } = await result.json()
            return formattedLog
        },
        enabled: !!program?.id && !!habit,
        refetchOnWindowFocus: false,
    })
}
