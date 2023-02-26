import { z } from "zod"

export const programSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
    startDate: z.date({ errorMap: () => ({ message: "Required" }) }),
})

export type ProgramSchema = z.infer<typeof programSchema>

export type ProgramOrder = "asc" | "desc"
export type ProgramView = "DAILY" | "WEEKLY"
