import { CompleteProgram } from "@/types/program"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"
import { useGetUser } from "../user/useGetUser"

export const useGetPrograms = () => {
    const { data: user } = useGetUser()
    const { role } = usePageRender()

    return useQuery<CompleteProgram[], Error>({
        queryKey: [role.toLocaleLowerCase(), "programs"],
        queryFn: async () => {
            const result = await fetch(`/api/program/${user?.id}/${role}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const { programs } = await result.json()
            return programs
        },
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    })
}
