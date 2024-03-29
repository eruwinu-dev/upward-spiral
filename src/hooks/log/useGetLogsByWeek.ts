import { HabitWithProgram } from "@/types/habit"
import { HabitLogSlot } from "@/types/log"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const useGetLogsByWeek = (habit: HabitWithProgram) => {
const { role, program, week } = usePageRender()

    return useQuery<HabitLogSlot[], Error>({
        queryKey: [
            role.toLowerCase(),
            "program",
            program,
            "week",
            week,
            "habit",
            habit.slug,
        ],
        queryFn: async () => {
            const result = await fetch(`/api/log/get/some`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    habitId: habit.id,
                    week: Number(week),
                    startDate: habit.program.startDate,
                    frequency: habit.frequency,
                    repeatDay: habit.repeatDay,
                }),
            })
            const { slots } = await result.json()
            return slots
        },
        enabled: !!habit?.id,
        refetchOnWindowFocus: false,
    })
}
