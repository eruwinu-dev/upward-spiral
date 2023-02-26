import { Habit, HabitType, Program, User } from "@prisma/client"

export type ProgramWithHabits = Program & {
    habits: (Habit & {
        habitType: HabitType
    })[]
}

export type CompleteProgram = Program & {
    trainees: {
        trainee: User
    }[]
}

export type ProgramView = "DAILY" | "WEEKLY"
