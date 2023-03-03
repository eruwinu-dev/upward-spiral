import { Habit, HabitType, Log, Program } from "@prisma/client"

export type CompleteHabit = Habit & {
    habitType: HabitType | null
}

export type HabitWithProgram = Habit & {
    program: Program
}

export type GroupedHabit = {
    id: string
    title: string
    createdAt: Date
    isCustom: boolean
    habits: HabitWithProgram[]
}
