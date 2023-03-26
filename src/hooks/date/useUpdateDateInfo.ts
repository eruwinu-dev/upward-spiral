import { fetcher } from "@/utils/fetcher"
import { useMutation } from "@tanstack/react-query"

export const updateDateInfo = async (slug: string) => {
    const dateInfo = await fetcher(
        "/api/date/update",
        "POST",
        JSON.stringify({ slug })
    )
    return dateInfo
}

export const useUpdateDateInfo = () => {
    return useMutation({
        mutationKey: ["update-date"],
        mutationFn: (slug: string) => updateDateInfo(slug),
    })
}
