import { slugify } from "./slugify"

export const defaultHabits = [
    {
        name: "Morning Habits",
        description: "Morning Habits",
        slug: slugify("Morning Habits"),
        type: "MORNING",
        frequency: "DAILY",
    },
    {
        name: "Evening Habits",
        description: "Evening Habits",
        slug: slugify("Evening Habits"),
        type: "EVENING",
        frequency: "DAILY",
    },
    {
        name: "Nutritional Habits",
        description: "Nutritional Habits",
        slug: slugify("Nutritional Habits"),
        type: "NUTRITIONAL",
        frequency: "DAILY",
    },
]
