import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const deleteTrainee = async (
    programSlug: string | undefined,
    traineeId: string
) => {
    const { count } = await fetcher(
        "/api/trainee/delete",
        "DELETE",
        JSON.stringify({ programSlug, traineeId })
    )
    return count
}

export const useDeleteTrainee = () => {
    const { program } = usePageRender()
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-trainee"],
        mutationFn: (traineeId: string) => deleteTrainee(program, traineeId),
        onSuccess: () =>
            queryClient.invalidateQueries(["trainer", "program", program]),
        onError: () => {},
    })
}
