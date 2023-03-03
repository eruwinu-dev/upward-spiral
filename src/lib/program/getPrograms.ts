import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"

export const getPrograms = async (userId: string, role: Role) => {
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

export const getProgram = async (userId: string, slug: string, role: Role) => {
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
