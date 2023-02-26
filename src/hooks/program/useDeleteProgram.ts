import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "@/hooks/user/useGetUser"

export const deleteProgram = async (
    slug: string | undefined,
    creatorId: string | undefined
) => {
    const { count } = await fetcher(
        "/api/program/delete",
        "DELETE",
        JSON.stringify({ slug, creatorId })
    )
    return count
}

export const useDeleteProgram = () => {
    const queryClient = useQueryClient()
    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["delete-program"],
        mutationFn: (slug: string | undefined) => deleteProgram(slug, user?.id),
        onSuccess: () => queryClient.invalidateQueries(["trainer", "programs"]),
        onError: () => {},
    })
}
