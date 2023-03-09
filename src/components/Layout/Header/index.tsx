import useUserContext from "@/context/UserState"
import Link from "next/link"
import React, { MouseEvent } from "react"

type Props = {}

const Header = ({}: Props) => {
    const { toggleDialog } = useUserContext()

    const toggleSignInDialogHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => toggleDialog("signIn")

    return (
        <header>
            <nav>
                <div>
                    <Link href="/">
                        <span className="font-logo text-xl text-primary hover:text-primary-focus">
                            Upward Spiral
                        </span>
                    </Link>
                </div>
                <ul>
                    <li>
                        <button
                            type="button"
                            className="text-base-200 hover:text-base-300 font-semibold p-2"
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="text-primary hover:text-primary-focus font-semibold p-2"
                            onClick={toggleSignInDialogHandler}
                        >
                            Sign In
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
