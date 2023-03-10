import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProgramSchema } from "@/schemas/program"
import { slugify } from "@/utils/slugify"

export const addProgram = async (data: ProgramSchema) => {
    const { program } = await fetcher(
        "/api/program/add",
        "POST",
        JSON.stringify({ ...data, slug: slugify(data.name) })
    )
    return program
}

export const useAddProgram = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["add-program"],
        mutationFn: (data: ProgramSchema) => addProgram(data),
        onSuccess: () => queryClient.invalidateQueries(["trainer", "programs"]),
        onError: () => {},
    })
}
