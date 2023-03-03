import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"
import { usePageRender } from "../custom/usePageRender"

type Data = {
    habitId?: string
    message: string
}

export const addLog = async (
    message: string,
    userId: string | undefined,
    habitId: string | undefined
) => {
    const { log } = await fetcher(
        "/api/log/add",
        "POST",
        JSON.stringify({
            message,
            userId,
            habitId,
        })
    )
    return log
}

export const useAddLog = () => {
    const queryClient = useQueryClient()
    const { program, role, week, habit } = usePageRender()
    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["add-log"],
        mutationFn: (data: Data) =>
            addLog(data.message, user?.id, data.habitId),
        onSuccess: (data) => {
            queryClient.invalidateQueries([
                role.toLocaleLowerCase(),
                "program",
                program,
                "week",
                week,
                "habit",
                habit,
            ])
        },
        onError: () => {},
    })
}
