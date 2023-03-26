import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const addTrainee = async (
    programSlug: string | undefined,
    traineeId: string
) => {
    const { trainee } = await fetcher(
        "/api/trainee/add",
        "POST",
        JSON.stringify({ programSlug, traineeId })
    )
    return trainee
}

export const useAddTrainee = () => {
    const { program } = usePageRender()
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["add-trainee"],
        mutationFn: (traineeId: string) => addTrainee(program, traineeId),
        onSuccess: () =>
            queryClient.invalidateQueries(["trainer", "program", program]),
        onError: () => {},
    })
}
