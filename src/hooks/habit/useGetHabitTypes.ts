import { HabitType } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"
import { useGetUser } from "../user/useGetUser"

export const useGetHabitTypes = () => {
    const { data: user } = useGetUser()
    const { role } = usePageRender()

    return useQuery<HabitType[], Error>({
        queryKey: [role.toLocaleLowerCase(), "habits", "types"],
        queryFn: async () => {
            const result = await fetch(`/api/habit/types`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            })
            const { types } = await result.json()
            return types
        },
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    })
}
