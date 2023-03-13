import prisma from "@/lib/prisma"

import { Role } from "@prisma/client"

export type GetHabitData = {
    userId: string
    programId: string
    role: Role
    habitSlug?: string
}

export const getHabits = async ({ userId, programId, role }: GetHabitData) => {
    const habits = await prisma.habitType.findMany({
        where: role === "USER" ? {} : { isCustom: false },
        select: {
            id: true,
            title: true,
            isCustom: true,
            habits:
                role === "USER"
                    ? {
                          where: {
                              programId,
                          },
                          include: { program: true },
                      }
                    : {
                          where: {
                              programId,
                              creatorId: userId,
                          },
                          include: { program: true },
                      },
        },
    })

    const sortedHabits = habits.map((habit) =>
        habit.isCustom
            ? {
                  ...habit,
                  habits: habit.habits.filter(
                      (habit) => habit.creatorId === userId
                  ),
              }
            : habit
    )

    return sortedHabits
}

export const getHabit = async ({
    userId,
    programId,
    role,
    habitSlug,
}: GetHabitData) => {
    const habit = await prisma.habit.findFirst({
        where:
            role === "USER"
                ? {
                      programId,
                      slug: habitSlug,
                      program: {
                          trainees: {
                              some: {
                                  traineeId: userId,
                              },
                          },
                      },
                  }
                : {
                      programId,
                      slug: habitSlug,
                      creatorId: userId,
                  },
    })
    return habit
}
