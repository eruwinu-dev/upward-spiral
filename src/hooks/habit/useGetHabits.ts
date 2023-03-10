import { GroupedHabit } from "@/types/habit"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetProgram } from "../program/useGetProgram"

export const useGetHabits = () => {
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
            const result = await fetch(`/api/habit/get/all`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    programId: program?.id,
                    role,
                }),
            })
            const { groups } = await result.json()
            return groups
        },
        enabled: !!program?.id,
        refetchOnWindowFocus: false,
    })
}
