import useUserContext from "@/context/UserState"
import { User } from "@prisma/client"
import React, { MouseEvent } from "react"
import TraineeGridItem from "./TraineeGridItem"

type Props = {
    trainees: User[]
}

const TraineeGrid = ({ trainees }: Props) => {
    const { toggleDialog } = useUserContext()

    const openAddTraineeDialog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleDialog("addTrainee")

    return (
        <div className="min-h-[93vh] max-h-[93vh] overflow-auto grid grid-cols-1 grid-flow-row place-items-start place-content-start col-span-5 p-4">
            <div className="inline-flex items-center justify-start space-x-2 w-full mb-4">
                <h3 className="text-xl font-bold">Trainees</h3>
                <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={openAddTraineeDialog}
                >
                    Add
                </button>
            </div>
            {trainees.length ? (
                trainees.map((trainee) => (
                    <TraineeGridItem key={trainee.id} trainee={trainee} />
                ))
            ) : (
                <div>No trainees in this program.</div>
            )}
        </div>
    )
}

export default TraineeGrid
