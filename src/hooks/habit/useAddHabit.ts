import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { slugify } from "@/utils/slugify"
import { HabitSchema } from "@/schemas/habit"
import { useGetProgram } from "../program/useGetProgram"
import { useGetUser } from "../user/useGetUser"
import { usePageRender } from "../custom/usePageRender"

export const addHabit = async (
    data: HabitSchema,
    programId: string | undefined,
    creatorId: string | undefined
) => {
    const { programSlug } = await fetcher(
        "/api/habit/add",
        "POST",
        JSON.stringify({
            ...data,
            slug: slugify(data.title),
            programId,
            creatorId,
        })
    )
    return programSlug
}

export const useAddHabit = () => {
    const queryClient = useQueryClient()
    const { data: user } = useGetUser()
    const { data: program } = useGetProgram()
    const { role } = usePageRender()

    return useMutation({
        mutationKey: ["add-habit"],
        mutationFn: (data: HabitSchema) =>
            addHabit(data, program?.id, user?.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries([
                role.toLocaleLowerCase(),
                "program",
                data,
                "habits",
            ])
        },
        onError: () => {},
    })
}
