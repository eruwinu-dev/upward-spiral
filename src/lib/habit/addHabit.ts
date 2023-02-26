import prisma from "@/lib/prisma"
import { slugify } from "@/utils/slugify"

export const addDefaultHabits = async (programId: string) => {
    const defaultHabits = await prisma.habit.findMany({
        where: { program: { type: "TEMPLATE" } },
    })

    const habits = await prisma.habit.createMany({
        data: [
            {
                name: "Morning Habits",
                description: "Morning Habits",
                slug: slugify("Morning Habits"),
                type: "MORNING",
                programId,
                frequency: "DAILY",
            },
            {
                name: "Evening Habits",
                description: "Evening Habits",
                slug: slugify("Evening Habits"),
                type: "EVENING",
                programId,
                frequency: "DAILY",
            },
            {
                name: "Nutritional Habits",
                description: "Nutritional Habits",
                slug: slugify("Nutritional Habits"),
                type: "NUTRITIONAL",
                programId,
                frequency: "DAILY",
            },
        ],
    })
    return habits
}
