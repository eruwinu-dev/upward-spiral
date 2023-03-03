import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "@/hooks/user/useGetUser"
import { usePageRender } from "../custom/usePageRender"
import { HabitSchema } from "@/schemas/habit"
import { useGetProgram } from "../program/useGetProgram"

export const editHabit = async (
    data: HabitSchema,
    programId: string | undefined,
    habitSlug: string | undefined,
    creatorId: string | undefined
) => {
    const { count } = await fetcher(
        "/api/habit/edit",
        "PATCH",
        JSON.stringify({
            ...data,
            programId,
            slug: habitSlug,
            creatorId,
        })
    )
    return count
}

export const useEditHabit = () => {
    const queryClient = useQueryClient()
    const { role, habit } = usePageRender()
    const { data: program } = useGetProgram()
    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["edit-habit"],
        mutationFn: (data: HabitSchema) =>
            editHabit(data, program?.id, habit, user?.id),
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
