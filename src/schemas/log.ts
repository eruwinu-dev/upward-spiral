import { z } from "zod"

export const ratings = ["1", "2", "3", "4", "5"] as const

export const checkLogSchema = z.object({
    message: z.coerce.boolean(),
})

export const messageLogSchema = z.object({
    message: z.string().min(1, { message: "Required" }),
})

export const numberLogSchema = z.object({
    message: z.number({ invalid_type_error: "Must must be a number" }),
})

export const ratingLogSchema = z.object({
    message: z.enum(ratings, {
        errorMap: () => ({ message: "Required" }),
    }),
})

export type CheckLogSchema = z.infer<typeof checkLogSchema>
export type MessageLogSchema = z.infer<typeof messageLogSchema>
export type NumberLogSchema = z.infer<typeof numberLogSchema>
export type RatingLogSchema = z.infer<typeof ratingLogSchema>
