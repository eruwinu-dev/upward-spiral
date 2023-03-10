import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "@/hooks/user/useGetUser"
import { usePageRender } from "../custom/usePageRender"

export const deleteHabit = async (slug: string | undefined) => {
    const { count } = await fetcher(
        "/api/habit/delete",
        "DELETE",
        JSON.stringify({ slug })
    )
    return count
}

export const useDeleteHabit = () => {
    const queryClient = useQueryClient()
    const { role, program } = usePageRender()

    return useMutation({
        mutationKey: ["delete-program"],
        mutationFn: (slug: string) => deleteHabit(slug),
        onSuccess: () =>
            queryClient.invalidateQueries([
                role.toLocaleLowerCase(),
                "program",
                program,
                "habits",
            ]),
        onError: () => {},
    })
}
