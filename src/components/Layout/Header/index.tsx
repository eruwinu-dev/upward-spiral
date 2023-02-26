import useUserContext from "@/context/UserState"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import React, { MouseEvent } from "react"
import HeaderDropdown from "./HeaderDropdown"

type Props = {}

const Header = ({}: Props) => {
    const { status, data: session } = useSession()
    const { toggleDialog, dialog } = useUserContext()

    const toggleSignInDialogHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => toggleDialog("signIn")

    let user = session?.user

    return (
        <header>
            <nav>
                <div>
                    <Link href="/">
                        <span className="font-logo text-xl text-primary">
                            Upward Spiral
                        </span>
                    </Link>
                </div>
                <ul>
                    <li>
                        {status === "loading" ? (
                            <></>
                        ) : status === "authenticated" ? (
                            <HeaderDropdown />
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary capitalize"
                                onClick={toggleSignInDialogHandler}
                            >
                                Sign In
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
