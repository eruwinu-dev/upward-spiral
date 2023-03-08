import Spinner from "@/components/Spinner"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import React from "react"
import HabitDashboard from "../HabitDashboard"
import HabitGrid from "./HabitGrid"
import TraineeGrid from "./TraineeGrid"
import TrainerTopBar from "./TrainerTopBar"

type Props = {}

const ProgramDashboard = (props: Props) => {
    const { habit: habitSlug, program: programSlug } = usePageRender()

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
            <TrainerTopBar program={program} habit={selectedHabit} />
            {!selectedHabit ? (
                <>
                    <HabitGrid groups={groups} />
                    <TraineeGrid
                        trainees={program.trainees.map(
                            (trainee) => trainee.trainee
                        )}
                    />
                </>
            ) : (
                <>
                    <HabitDashboard habit={selectedHabit} />
                </>
            )}
        </>
    )
}

export default ProgramDashboard
