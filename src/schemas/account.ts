import { z } from "zod"

export const accountSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    offset: z.coerce.number(),
    email: z.string().min(1, { message: "Required" }),
})

export type AccountSchema = z.infer<typeof accountSchema>
