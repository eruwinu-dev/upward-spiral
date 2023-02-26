import { CompleteProgram } from "@/types/program"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"
import { useGetUser } from "../user/useGetUser"

export const useGetProgram = () => {
    const { data: user } = useGetUser()
    const { role, program: slug } = usePageRender()

    return useQuery<CompleteProgram | null, Error>({
        queryKey: [role.toLocaleLowerCase(), "program", slug],
        queryFn: async () => {
            const result = await fetch(
                `/api/program/${user?.id}/${role}/${slug}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            )
            const { program } = await result.json()
            return program
        },
        enabled: !!user?.id && !!slug,
        refetchOnWindowFocus: false,
    })
}
