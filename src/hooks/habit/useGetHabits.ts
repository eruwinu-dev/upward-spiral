import { GroupedHabit } from "@/types/habit"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetProgram } from "../program/useGetProgram"
import { useGetUser } from "../user/useGetUser"

export const useGetHabits = () => {
    const { data: user } = useGetUser()
    const { data: program } = useGetProgram()
    const { role } = usePageRender()

    return useQuery<GroupedHabit[], Error>({
        queryKey: [
            role.toLocaleLowerCase(),
            "program",
            program?.slug,
            "habits",
        ],
        queryFn: async () => {
            const result = await fetch(
                `/api/habit/${program?.id}/${user?.id}/${role}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            )
            const { habits } = await result.json()
            return habits
        },
        enabled: !!user?.id && !!program?.id,
        refetchOnWindowFocus: false,
    })
}