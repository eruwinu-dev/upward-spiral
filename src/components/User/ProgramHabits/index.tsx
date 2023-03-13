import Spinner from "@/components/Spinner"
import useUserContext from "@/context/UserState"
import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetHabits } from "@/hooks/habit/useGetHabits"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import React, { useEffect } from "react"
import UserTopBar from "../UserTopBar"
import HabitsCalendar from "./HabitsCalendar"
import HabitViewBox from "./HabitViewBox"

type Props = {}

const ProgramHabits = (props: Props) => {
    const {
        program: programSlug,
        habit: habitSlug,
        view: viewSlug,
    } = usePageRender()
    const { data: program } = useGetProgram()
    const { data: groups, isLoading } = useGetHabits()
    const {
        dialog: { addLog: addLogDialog },
    } = useUserContext()

    const selectedHabit = groups
        ? habitSlug
            ? groups
                  .map((group) => group.habits)
                  .flatMap((habit) => habit)
                  .find((habit) => habit.slug === habitSlug)
            : undefined
        : undefined

    const customHabit = !!(groups
        ? selectedHabit
            ? groups.find(
                  (group) =>
                      group.isCustom &&
                      group.habits.some(
                          (habit) => habit.slug === selectedHabit.slug
                      )
              )
            : undefined
        : undefined)

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.document.title = isLoading
                ? "Upward Spiral"
                : `${
                      program
                          ? `${program.name}${
                                viewSlug && viewSlug === "habit"
                                    ? ` - ${
                                          viewSlug && selectedHabit
                                              ? `${selectedHabit.message} | `
                                              : ``
                                      }`
                                    : " | "
                            }`
                          : ""
                  }Upward Spiral`
        }
        return () => {}
    }, [program, viewSlug, selectedHabit])

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
            <UserTopBar
                program={program}
                habit={selectedHabit}
                isCustom={customHabit}
            />
            {selectedHabit && !addLogDialog && viewSlug ? (
                <HabitViewBox habit={selectedHabit} isCustom={customHabit} />
            ) : (
                <>
                    <HabitsCalendar groups={groups} />
                </>
            )}
        </>
    )
}

export default ProgramHabits
