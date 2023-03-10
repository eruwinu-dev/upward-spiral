import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetProgram } from "../program/useGetProgram"

export const addTrainee = async (
    programId: string | undefined,
    traineeId: string
) => {
    const { trainee } = await fetcher(
        "/api/trainee/add",
        "POST",
        JSON.stringify({ programId, traineeId })
    )
    return trainee
}

export const useAddTrainee = () => {
    const queryClient = useQueryClient()
    const { data: program } = useGetProgram()

    return useMutation({
        mutationKey: ["add-trainee"],
        mutationFn: (traineeId: string) => addTrainee(program?.id, traineeId),
        onSuccess: () =>
            queryClient.invalidateQueries([
                "trainer",
                "program",
                program?.slug,
            ]),
        onError: () => {},
    })
}
