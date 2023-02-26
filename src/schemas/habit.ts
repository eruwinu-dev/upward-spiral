import { z } from "zod"

export const frequencies = ["DAILY", "WEEKLY", "BIWEEKLY", "CUSTOM"] as const

export const metrics = ["RATING", "NUMBER", "MESSAGE", "CHECK"] as const

export const habitSchema = z
    .object({
        title: z.string().min(1, { message: "Required" }),
        message: z.string().min(1, { message: "Required" }),
        metric: z.enum(metrics, {
            errorMap: () => ({ message: "Required" }),
        }),
        habitTypeId: z.string().min(1, { message: "Required" }),
        repeatDay: z.coerce
            .number({ invalid_type_error: "Required" })
            .gte(1, { message: "Required" })
            .lte(7, { message: "Required" })
            .optional(),
        duration: z.coerce
            .number({ invalid_type_error: "Required" })
            .gte(1, { message: "Required" })
            .lte(15, { message: "Required" })
            .optional(),
        frequency: z.enum(frequencies, {
            errorMap: () => ({ message: "Required" }),
        }),
    })
    .refine((input) => {
        if (
            ["WEEKLY", "BIWEEKLY"].includes(input.frequency) &&
            !input.repeatDay
        )
            return false
        if (input.frequency === "CUSTOM" && !input.duration) return false
        return true
    })

export type HabitSchema = z.infer<typeof habitSchema>
