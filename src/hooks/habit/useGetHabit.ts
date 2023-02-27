import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetProgram } from "../program/useGetProgram"
import { useGetUser } from "../user/useGetUser"
import { Habit } from "@prisma/client"

export const useGetHabit = () => {
    const { data: user } = useGetUser()
    const { data: program } = useGetProgram()
    const { role, habit: slug } = usePageRender()

    return useQuery<Habit, Error>({
        queryKey: [
            role.toLocaleLowerCase(),
            "program",
            program?.slug,
            "habits",
            slug,
        ],
        queryFn: async () => {
            const result = await fetch(
                `/api/habit/${program?.id}/${user?.id}/${role}/${slug}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            )
            const { habit } = await result.json()
            return habit
        },
        enabled: !!user?.id && !!program?.id && !!slug,
        refetchOnWindowFocus: false,
    })
}
