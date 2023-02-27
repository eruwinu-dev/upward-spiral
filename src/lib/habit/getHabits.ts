import { Role } from "@prisma/client"

export const getHabits = async (
    userId: string,
    programId: string,
    role: Role
) => {
    const sortedHabits = await prisma.habitType.findMany({
        where: role === "USER" ? {} : { isCustom: false },
        select: {
            id: true,
            title: true,
            isCustom: true,
            habits: {
                where:
                    role === "USER"
                        ? {
                              programId,
                          }
                        : {
                              programId,
                              creatorId: userId,
                          },
            },
        },
    })
    return sortedHabits
}

export const getHabit = async (
    userId: string,
    programId: string,
    habitSlug: string,
    role: Role
) => {
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
