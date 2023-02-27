import { z } from "zod"

export const frequencies = ["DAILY", "WEEKLY", "BIWEEKLY", "CUSTOM"] as const

export const metrics = ["RATING", "NUMBER", "MESSAGE", "CHECK"] as const

export const habitSchema = z.object({
    title: z.string().min(1, { message: "Required" }),
    message: z.string().min(1, { message: "Required" }),
    metric: z.enum(metrics, {
        errorMap: () => ({ message: "Required" }),
    }),
    habitTypeId: z.string().min(1, { message: "Required" }),
    repeatDay: z.coerce.number().optional(),
    duration: z.coerce.number().optional(),
    frequency: z.enum(frequencies, {
        errorMap: () => ({ message: "Required" }),
    }),
})

export type HabitSchema = z.infer<typeof habitSchema>
