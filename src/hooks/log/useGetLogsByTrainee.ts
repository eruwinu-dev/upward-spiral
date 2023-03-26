import { HabitWithProgram } from "@/types/habit"
import { HabitLogSlot } from "@/types/log"
import { useQuery } from "@tanstack/react-query"
import { usePageRender } from "../custom/usePageRender"

export const useGetLogsByTrainee = (habit: HabitWithProgram) => {
    const { role, program, week, trainee } = usePageRender()

    return useQuery<HabitLogSlot[], Error>({
        queryKey: [
            role.toLowerCase(),
            "program",
            program,
            "week",
            week,
            "habit",
            habit.slug,
            "trainee",
            trainee,
        ],
        queryFn: async () => {
            const result = await fetch(`/api/log/get/trainee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    habitId: habit.id,
                    week: Number(week),
                    startDate: habit.program.startDate,
                    frequency: habit.frequency,
                    repeatDay: habit.repeatDay,
                    traineeId: trainee,
                }),
            })
            const { slots } = await result.json()
            return slots
        },
        enabled: !!habit?.id,
        refetchOnWindowFocus: false,
    })
}
