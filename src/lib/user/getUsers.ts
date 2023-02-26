import prisma from "@/lib/prisma"

export const getUsers = async (userId: string) => {
    const isTrainer = await prisma.user.findFirst({
        where: { id: userId, role: { not: "USER" } },
    })

    if (!isTrainer) return null

    const users = await prisma.user.findMany({})

    return users
}
