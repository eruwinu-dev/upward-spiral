import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "./useGetUser"

export const useGetUsers = () => {
    const { data: user } = useGetUser()

    return useQuery<User[] | null, Error>({
        queryKey: ["manager", "trainees"],
        queryFn: async () => {
            const result = await fetch("/api/user/getAll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user }),
            })
            const { users } = await result.json()
            return users
        },
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    })
}
