import { User } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export const useGetUser = () => {
    const { data: session } = useSession()
    let email = session?.user?.email
    return useQuery<User, Error>({
        queryKey: ["user"],
        queryFn: async () => {
            const result = await fetch("/api/user/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            const { user } = await result.json()
            return user
        },
        enabled: !!email,
        refetchOnWindowFocus: false,
    })
}
