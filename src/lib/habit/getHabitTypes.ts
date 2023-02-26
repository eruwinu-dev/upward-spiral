import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"

export const getHabitTypes = async () => {
    const types = await prisma.habitType.findMany({})
    return types
}
