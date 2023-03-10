import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "./useGetUser"

export const useGetUsers = () => {
    return useQuery<User[] | null, Error>({
        queryKey: ["manager", "trainees"],
        queryFn: async () => {
            const result = await fetch("/api/user/get/all", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            })
            const { users } = await result.json()
            return users
        },
        refetchOnWindowFocus: false,
    })
}
