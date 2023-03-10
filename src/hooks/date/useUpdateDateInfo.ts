import { fetcher } from "@/utils/fetcher"
import { useMutation } from "@tanstack/react-query"

export const updateDateInfo = async (startDate: Date, timezone: string) => {
    const dateInfo = await fetcher(
        "/api/date/update",
        "POST",
        JSON.stringify({ startDate, timezone })
    )
    return dateInfo
}

export const useUpdateDateInfo = () => {
    return useMutation({
        mutationKey: ["update-date"],
        mutationFn: (startDate: Date) => updateDateInfo(startDate),
    })
}
