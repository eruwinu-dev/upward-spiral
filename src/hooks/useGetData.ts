import { DataKey } from "@/pages/api/data"
import { fetcher } from "@/utils/fetcher"
import { useQuery } from "@tanstack/react-query"

export const useGetData = () => {
    return useQuery<{ data: DataKey[] | undefined }>({
        queryKey: ["data"],
        queryFn: async () =>
            await fetcher("/api/data", "POST", JSON.stringify({})),
        initialData: {
            data: undefined,
        },
        refetchOnWindowFocus: false,
    })
}
