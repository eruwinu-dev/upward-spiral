import { fetcher } from "@/utils/fetcher"
import { useMutation } from "@tanstack/react-query"

export const updateDateInfo = async (createdAt: Date) => {
    const dateInfo = await fetcher(
        "/api/date/update",
        "POST",
        JSON.stringify({ createdAt })
    )
    return dateInfo
}

export const useUpdateDateInfo = () => {
    return useMutation({
        mutationKey: ["update-date"],
        mutationFn: (createdAt: Date) => updateDateInfo(createdAt),
    })
}
