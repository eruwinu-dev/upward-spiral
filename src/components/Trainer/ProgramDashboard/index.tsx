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
    const { habit: habitSlug } = usePageRender()

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

    if (isLoading) return <></>

    if (!program || !groups)
        return (
            <>
                <div className="w-full aspect-video grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4 col-span-12">
                    <div>No program selected.</div>
                </div>
            </>
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
                <HabitDashboard habit={selectedHabit} />
            )}
        </>
    )
}

export default ProgramDashboard
