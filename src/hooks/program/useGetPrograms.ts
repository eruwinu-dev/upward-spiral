import { CompleteProgram } from "@/types/program"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const useGetPrograms = () => {
    const { role } = usePageRender()

    return useQuery<CompleteProgram[], Error>({
        queryKey: [role.toLocaleLowerCase(), "programs"],
        queryFn: async () => {
            const result = await fetch("/api/program/get/all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            })
            const { programs } = await result.json()
            return programs
        },
        refetchOnWindowFocus: false,
    })
}
