import Spinner from "@/components/Spinner"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import React, { useEffect } from "react"
import HabitDashboard from "../HabitDashboard"
import HabitGrid from "./HabitGrid"
import TraineeCalendar from "../TraineeCalendar"
import TraineeGrid from "./TraineeGrid"
import TrainerTopBar from "./TrainerTopBar"

type Props = {}

const ProgramDashboard = (props: Props) => {
    const {
        role,
        habit: habitSlug,
        program: programSlug,
        trainee: traineeId,
        view: viewSlug,
    } = usePageRender()

    const { data: program } = useGetProgram()
    const { data: groups, isLoading } = useGetHabits()

    const selectedHabit = groups
        ? habitSlug
            ? groups
                  .map((group) => group.habits)
                  .flatMap((habit) => habit)
                  .find((habit) => habit.slug === habitSlug)
            : undefined
        : undefined

    const trainees = program
        ? program.trainees.map((trainee) => trainee.trainee)
        : []

    const selectedTrainee = traineeId
        ? trainees.find((trainee) => trainee.id === traineeId)
        : undefined

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.document.title = isLoading
                ? "Trainer Dashboard - Upward Spiral"
                : `${
                      program
                          ? `${program.name} | ${
                                selectedHabit
                                    ? ` ${selectedHabit.message} `
                                    : ``
                            }${
                                selectedTrainee
                                    ? `${selectedTrainee.name} `
                                    : ``
                            }`
                          : ""
                  }${
                      (program && selectedHabit) || selectedTrainee ? " | " : ""
                  }Trainer Dashboard - Upward Spiral`
        }
        return () => {}
    }, [role, program, viewSlug, selectedHabit, selectedTrainee])

    if (!programSlug)
        return (
            <>
                <div className="w-full grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4 col-span-12">
                    <div>No program selected.</div>
                </div>
            </>
        )

    if (!program || !groups || isLoading)
        return (
            <div className="w-full grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4 col-span-12">
                <Spinner />
            </div>
        )

    return (
        <>
            <TrainerTopBar
                program={program}
                habit={selectedHabit}
                trainee={selectedTrainee}
            />
            {selectedHabit && selectedTrainee ? (
                <TraineeCalendar
                    program={program}
                    trainee={selectedTrainee}
                    groups={groups}
                />
            ) : selectedHabit ? (
                <HabitDashboard habit={selectedHabit} />
            ) : selectedTrainee ? (
                <TraineeCalendar
                    program={program}
                    trainee={selectedTrainee}
                    groups={groups}
                />
            ) : (
                <>
                    <HabitGrid groups={groups} />
                    <TraineeGrid trainees={trainees} />
                </>
            )}
        </>
    )
}

export default ProgramDashboard
