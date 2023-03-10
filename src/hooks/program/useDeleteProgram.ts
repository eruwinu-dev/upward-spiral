import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteProgram = async (slug: string | undefined) => {
    const { count } = await fetcher(
        "/api/program/delete",
        "DELETE",
        JSON.stringify({ slug })
    )
    return count
}

export const useDeleteProgram = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-program"],
        mutationFn: (slug: string | undefined) => deleteProgram(slug),
        onSuccess: () => queryClient.invalidateQueries(["trainer", "programs"]),
        onError: () => {},
    })
}
