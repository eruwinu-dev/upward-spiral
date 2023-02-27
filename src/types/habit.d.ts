import { Habit, HabitType } from "@prisma/client"

export type CompleteHabit = Habit & {
    habitType: HabitType | null
}

export type GroupedHabit = {
    id: string
    title: string
    isCustom: boolean
    habits: Habit[]
}
