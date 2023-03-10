import { CompleteProgram } from "@/types/program"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const useGetProgram = () => {
    const { role, program: slug } = usePageRender()

    return useQuery<CompleteProgram | null, Error>({
        queryKey: [role.toLocaleLowerCase(), "program", slug],
        queryFn: async () => {
            const result = await fetch("/api/program/get/one", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slug,
                    role,
                }),
            })
            const { program } = await result.json()
            return program
        },
        enabled: !!slug,
        refetchOnWindowFocus: false,
    })
}
