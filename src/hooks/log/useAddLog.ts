import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

type Data = {
    habitId?: string
    message: string
}

export const addLog = async (message: string, habitId: string | undefined) => {
    const { log } = await fetcher(
        "/api/log/add",
        "POST",
        JSON.stringify({
            message,
            habitId,
        })
    )
    return log
}

export const useAddLog = () => {
    const queryClient = useQueryClient()
    const { program, role, week, habit } = usePageRender()

    return useMutation({
        mutationKey: ["add-log"],
        mutationFn: (data: Data) => addLog(data.message, data.habitId),
        onSuccess: () => {
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
