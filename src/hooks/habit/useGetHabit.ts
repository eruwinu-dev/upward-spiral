import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetProgram } from "../program/useGetProgram"
import { Habit } from "@prisma/client"
import { useGetUser } from "../user/useGetUser"

export const useGetHabit = () => {
    const { data: program } = useGetProgram()
    const { data: user } = useGetUser()
    const { role, habit: slug } = usePageRender()

    return useQuery<Habit, Error>({
        queryKey: [
            role.toLocaleLowerCase(),
            "program",
            program?.slug,
            "habit",
            slug,
        ],
        queryFn: async () => {
            const result = await fetch(`/api/habit/get/one`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                    programId: program?.id,
                    role,
                    habitSlug: slug,
                }),
            })
            const { habit } = await result.json()
            return habit
        },
        enabled: !!program?.id && !!slug,
        refetchOnWindowFocus: false,
    })
}
