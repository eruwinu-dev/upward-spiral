import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"
import { HabitSchema } from "@/schemas/habit"
import { useGetProgram } from "../program/useGetProgram"

export const editHabit = async (
    data: HabitSchema,
    programId: string | undefined
) => {
    const { count } = await fetcher(
        "/api/habit/edit",
        "PATCH",
        JSON.stringify({
            ...data,
            programId,
        })
    )
    return count
}

export const useEditHabit = () => {
    const queryClient = useQueryClient()
    const { role } = usePageRender()
    const { data: program } = useGetProgram()

    return useMutation({
        mutationKey: ["edit-habit"],
        mutationFn: (data: HabitSchema) => editHabit(data, program?.id),
        onSuccess: () =>
            queryClient.invalidateQueries([
                role.toLocaleLowerCase(),
                "program",
                program?.slug,
                "habits",
            ]),
        onError: () => {},
    })
}
