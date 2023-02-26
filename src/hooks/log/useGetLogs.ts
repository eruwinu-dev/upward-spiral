import { matchParams } from "@/utils/parameters"
import { Log } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useGetProgram } from "../program/useGetProgram"
import { useGetUser } from "../user/useGetUser"

export const useGetLogs = () => {
    const {
        query: { params, week: paramsWeek },
        pathname,
    } = useRouter()
    const { data: user } = useGetUser()
    const { data: program } = useGetProgram()

    const paramsMap = matchParams(params)

    const week = pathname.endsWith("[...params]")
        ? paramsMap.get("week")
        : paramsWeek

    return useQuery<Record<string, Log[]>, Error>({
        queryKey: ["user", "program", program?.slug, "habits", "logs", week],
        queryFn: async () => {
            const result = await fetch(`/api/log/get`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                    programId: program?.id,
                    createdAt: program?.createdAt,
                    week,
                }),
            })
            const { logs } = await result.json()
            return logs
        },
        enabled: !!program?.id,
        refetchOnWindowFocus: false,
    })
}
