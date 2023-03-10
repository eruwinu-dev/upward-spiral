import { ProgramOrder, ProgramView } from "@/schemas/program"
import { ActionStatus } from "@/types/action"
import { UserAction, UserContextType, UserDialog } from "@/types/user"
import { createContext, ReactNode, useContext, useState } from "react"

type Props = {
    children: ReactNode
}

const initialUserDialog: UserDialog = {
    signIn: false,
    addProgram: false,
    editProgram: false,
    deleteProgram: false,
    addHabit: false,
    editHabit: false,
    deleteHabit: false,
    viewLog: false,
    addLog: false,
    editLog: false,
    deleteLog: false,
    addTrainee: false,
    deleteTrainee: false,
    editUser: false,
}

const initialUserAction: UserAction = {
    signIn: "IDLE",
    addProgram: "IDLE",
    editProgram: "IDLE",
    deleteProgram: "IDLE",
    addHabit: "IDLE",
    editHabit: "IDLE",
    deleteHabit: "IDLE",
    viewLog: "IDLE",
    addLog: "IDLE",
    editLog: "IDLE",
    deleteLog: "IDLE",
    addTrainee: "IDLE",
    deleteTrainee: "IDLE",
    editUser: "IDLE",
}

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: Props) => {
    const [dialog, setDialog] = useState<UserDialog>(initialUserDialog)
    const [action, setAction] = useState<UserAction>(initialUserAction)

    const [programOrder, setProgramOrder] = useState<ProgramOrder>("asc")
    const [programView, setProgramView] = useState<ProgramView>("WEEKLY")

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    const [selectedHabitSlug, setSelectedHabitSlug] = useState<string | null>(
        null
    )

    const selectUser = (userId: string | null) => setSelectedUserId(userId)

    const selectHabit = (slug: string | null) => setSelectedHabitSlug(slug)

    const toggleProgramOrder = (order: ProgramOrder) => setProgramOrder(order)

    const toggleProgramView = (view: ProgramView) => setProgramView(view)

    const toggleDialog = (prop: keyof UserDialog) => {
        setDialog((dialog) => ({
            ...dialog,
            [prop]: !dialog[prop],
        }))
    }

    const toggleAction = (prop: keyof UserAction, state: ActionStatus) => {
        setAction((action) => ({ ...action, [prop]: state }))
    }

    const value: UserContextType = {
        dialog,
        action,
        toggleDialog,
        toggleAction,
        programOrder,
        programView,
        toggleProgramView,
        toggleProgramOrder,
        selectedUserId,
        selectUser,
        selectedHabitSlug,
        selectHabit,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext) as UserContextType

export default useUserContext
