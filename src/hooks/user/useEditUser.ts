import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AccountSchema } from "@/schemas/account"

export const editUser = async (data: AccountSchema) => {
    const { count } = await fetcher(
        "/api/user/edit",
        "PATCH",
        JSON.stringify({
            ...data,
        })
    )
    return count
}

export const useEditUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["edit-user"],
        mutationFn: (data: AccountSchema) => editUser(data),
        onSuccess: () => queryClient.invalidateQueries(["user"]),
        onError: () => {},
    })
}
