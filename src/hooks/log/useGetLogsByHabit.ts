import { HabitWithProgram } from "@/types/habit"
import { LogSummary } from "@/types/log"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const useGetLogsByHabit = (habit: HabitWithProgram) => {
    const { role, program, week } = usePageRender()

    return useQuery<LogSummary, Error>({
        queryKey: [
            role.toLowerCase(),
            "program",
            program,
            "week",
            week,
            "habit",
            habit.slug,
            "logs",
            "view",
        ],
        queryFn: async () => {
            const result = await fetch(`/api/log/get/all`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    habitId: habit.id,
                    startDate: habit.program.startDate,
                    frequency: habit.frequency,
                    repeatDay: habit.repeatDay,
                    duration: habit.duration,
                }),
            })
            const data = await result.json()
            return data
        },
        enabled: !!habit?.id,
        refetchOnWindowFocus: true,
    })
}
