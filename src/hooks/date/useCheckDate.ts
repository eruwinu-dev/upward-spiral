import { fetcher } from "@/utils/fetcher"
import { useMutation } from "@tanstack/react-query"

export type CheckDateInfo = {
    createdAt: Date
    week: number
    day: number
}

export const checkDate = async (info: CheckDateInfo) => {
    const check = await fetcher("/api/date/check", "POST", JSON.stringify(info))
    return check
}

export const useCheckDate = () => {
    return useMutation({
        mutationKey: ["check-date"],
        mutationFn: (info: CheckDateInfo) => checkDate(info),
    })
}
