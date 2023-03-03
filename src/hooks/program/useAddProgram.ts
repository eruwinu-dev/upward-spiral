import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "@/hooks/user/useGetUser"
import { ProgramSchema } from "@/schemas/program"
import { slugify } from "@/utils/slugify"

export const addProgram = async (
    data: ProgramSchema,
    trainerId: string | undefined
) => {
    const { program } = await fetcher(
        "/api/program/add",
        "POST",
        JSON.stringify({ ...data, slug: slugify(data.name), trainerId })
    )
    return program
}

export const useAddProgram = () => {
    const queryClient = useQueryClient()
    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["add-program"],
        mutationFn: (data: ProgramSchema) => addProgram(data, user?.id),
        onSuccess: () => queryClient.invalidateQueries(["trainer", "programs"]),
        onError: () => {},
    })
}
