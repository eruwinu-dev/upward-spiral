import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"

export type GetProgramData = {
    userId: string
    slug?: string
    role: Role
}

export const getPrograms = async ({ userId, role }: GetProgramData) => {
    const programs = await prisma.program.findMany({
        where:
            role === "USER"
                ? {
                      trainees: {
                          some: {
                              traineeId: userId,
                          },
                      },
                  }
                : {
                      trainerId: userId,
                  },
        include:
            role === "USER"
                ? {
                      trainees: {
                          select: { trainee: true },
                      },
                  }
                : {
                      trainees: {
                          select: { trainee: true },
                      },
                  },
    })
    return programs
}

export const getProgram = async ({ userId, slug, role }: GetProgramData) => {
    const program = await prisma.program.findFirst({
        where:
            role === "USER"
                ? {
                      slug,
                      trainees: {
                          some: {
                              traineeId: userId,
                          },
                      },
                  }
                : { slug, trainerId: userId },
        include:
            role === "USER"
                ? {
                      trainees: {
                          select: { trainee: true },
                      },
                  }
                : {
                      trainees: {
                          select: { trainee: true },
                      },
                  },
    })
    return program
}
