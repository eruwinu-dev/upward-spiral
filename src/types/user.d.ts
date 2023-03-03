import { ProgramOrder } from "@/schemas/program"
import { ActionStatus } from "./action"
import { ProgramView, ProgramOrder } from "./program"

export type UserDialog = {
    signIn: boolean
    addProgram: boolean
    editProgram: boolean
    deleteProgram: boolean
    addHabit: boolean
    editHabit: boolean
    deleteHabit: boolean
    addLog: boolean
    viewLog: boolean
    editLog: boolean
    deleteLog: boolean
    addTrainee: boolean
    deleteTrainee: boolean
}

export type UserAction = {
    signIn: ActionStatus
    addProgram: ActionStatus
    editProgram: ActionStatus
    deleteProgram: ActionStatus
    addHabit: ActionStatus
    editHabit: ActionStatus
    deleteHabit: ActionStatus
    addLog: ActionStatus
    viewLog: ActionStatus
    editLog: ActionStatus
    deleteLog: ActionStatus
    addTrainee: ActionStatus
    deleteTrainee: ActionStatus
}

export interface UserContextType {
    dialog: UserDialog
    action: UserAction
    toggleAction: (prop: keyof UserAction, state: ActionStatus) => void
    toggleDialog: (prop: keyof UserDialog) => void
    programOrder: ProgramOrder
    programView: ProgramView
    toggleProgramOrder: (order: ProgramOrder) => void
    toggleProgramView: (view: ProgramView) => void
    selectedUserId: string | null
    selectUser: (userId: string | null) => void
}
