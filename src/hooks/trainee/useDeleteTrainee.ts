import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetProgram } from "../program/useGetProgram"

export const deleteTrainee = async (
    programId: string | undefined,
    traineeId: string
) => {
    const { count } = await fetcher(
        "/api/trainee/delete",
        "DELETE",
        JSON.stringify({ programId, traineeId })
    )
    return count
}

export const useDeleteTrainee = () => {
    const queryClient = useQueryClient()
    const { data: program } = useGetProgram()

    return useMutation({
        mutationKey: ["delete-trainee"],
        mutationFn: (traineeId: string) =>
            deleteTrainee(program?.id, traineeId),
        onSuccess: () =>
            queryClient.invalidateQueries([
                "trainer",
                "program",
                program?.slug,
            ]),
        onError: () => {},
    })
}
