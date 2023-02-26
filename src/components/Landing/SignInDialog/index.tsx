import BaseDialog from "@/components/BaseDialog"
import useUserContext from "@/context/UserState"
import { signIn } from "next-auth/react"
import React, { MouseEvent } from "react"

type Props = {}

const SignInDialog = (props: Props) => {
    const {
        dialog: { signIn: signInDialog },
        toggleAction,
        toggleDialog,
    } = useUserContext()

    const toggleSignInDialogHandler = () => {
        toggleDialog("signIn")
        setTimeout(() => toggleAction("signIn", "IDLE"), 500)
    }

    const signInHandler = async (event: MouseEvent) => {
        await signIn("google")
        setTimeout(() => toggleAction("signIn", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={signInDialog}
            onClose={toggleSignInDialogHandler}
            title="Build Great Habits."
        >
            <div className="w-full grid grid-cols-1 grid-flow-row p-4">
                <div className="grid grid-cols-1 grid-flow-row place-items-center gap-4">
                    <p className="text-center">
                        Join us at Upward Spiral to achieve your dream
                        discipline.
                    </p>
                    <button
                        type="button"
                        className="btn btn-ghost btn-wide hover:bg-white border-2 border-black/50 hover:border-black capitalize"
                        onClick={signInHandler}
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </BaseDialog>
    )
}

export default SignInDialog
