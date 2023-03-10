import { z } from "zod"

export const accountSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    timezone: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }),
})

export type AccountSchema = z.infer<typeof accountSchema>
