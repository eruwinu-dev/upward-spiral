import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import { Icons } from "@/components/Icons"
import useUserContext from "@/context/UserState"
import useDebounce from "@/hooks/custom/useDebounce"
import { useGetProgram } from "@/hooks/program/useGetProgram"
import { useAddTrainee } from "@/hooks/trainee/useAddTrainee"
import { useGetUsers } from "@/hooks/user/useGetUsers"
import { User } from "@prisma/client"
import React, { ChangeEvent, MouseEvent, useState } from "react"

type Props = {}

const AddTraineeForm = (props: Props) => {
    const { toggleAction } = useUserContext()
    const { data: users, isLoading } = useGetUsers()
    const { data: program } = useGetProgram()
    const { mutateAsync: mutateAddTrainee } = useAddTrainee()

    const trainees = program
        ? program.trainees.map((trainee) => trainee.trainee)
        : null

    const isTrainee = (traineeId: string) =>
        trainees ? trainees.some((trainee) => trainee.id === traineeId) : false

    const [query, setQuery] = useState("")
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null)

    useDebounce(
        () => {
            setFilteredUsers(
                users
                    ? users.filter(
                          (user) =>
                              (user.name
                                  ? user.name
                                        .toLowerCase()
                                        .startsWith(query.toLowerCase())
                                  : false) && !isTrainee(user.id)
                      )
                    : null
            )
        },
        [users, query],
        200
    )

    const queryHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setQuery(event.target.value)

    const addTraineeHandler =
        (traineeId: string) => async (event: MouseEvent<HTMLButtonElement>) => {
            if (!trainees) return
            toggleAction("addTrainee", "LOADING")
            const trainee = await mutateAddTrainee(traineeId)
            if (!trainee) return
            toggleAction("addTrainee", "SUCCESS")
        }

    if (isLoading) return <DialogSpinner text="Getting trainees..." />

    return (
        <>
            <div className="form-control">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="input input-sm input-bordered w-full"
                        value={query}
                        onChange={queryHandler}
                    />
                    <button className="btn btn-square btn-sm">
                        {Icons("search")}
                    </button>
                </div>
            </div>
            <div className="min-h-[30vh] max-h-[30vh] grid grid-cols-1 grid-flow-row place-content-start gap-2 overflow-y-auto px-1">
                {filteredUsers ? (
                    filteredUsers.length ? (
                        filteredUsers.map((user) => (
                            <button
                                key={user.id}
                                className="btn btn-sm btn-ghost inline-flex items-center justify-between"
                                disabled={isTrainee(user.id)}
                                onClick={addTraineeHandler(user.id)}
                            >
                                <span>{user.name}</span>
                                {isTrainee(user.id) ? (
                                    <span className="text-sm font-normal">
                                        In Program
                                    </span>
                                ) : null}
                            </button>
                        ))
                    ) : (
                        <span>No users.</span>
                    )
                ) : null}
            </div>
        </>
    )
}

export default AddTraineeForm
