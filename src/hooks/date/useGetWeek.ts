import { GetWeekData } from "@/types/date"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const useGetWeek = (startDate: Date) => {
    const { week, role } = usePageRender()

    return useQuery<GetWeekData, Error>({
        queryKey: [role.toLocaleLowerCase(), "week", week],
        queryFn: async () => {
            const result = await fetch("/api/date/get/week", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startDate,
                    week,
                }),
            })
            const data = await result.json()
            return data
        },
        enabled: !!week,
        refetchOnWindowFocus: false,
    })
}
