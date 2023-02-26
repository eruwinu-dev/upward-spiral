import { useGetUser } from "@/hooks/user/useGetUser"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

type Props = {}

const HeaderDropdown = (props: Props) => {
    const { pathname } = useRouter()
    const { data: user } = useGetUser()

    if (!user) return <></>

    const signOutHandler = async () => await signOut()

    return (
        <div className="header-dropdown dropdown-hover">
            <label tabIndex={0} className="btn btn-circle btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
                <li>
                    <Link href="/">
                        <div className="grid grid-cols-1 grid-flow-row gap-2">
                            <span className="text-xs">Signed in as</span>
                            <span className="font-semibold">{user.name}</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/">Account</Link>
                </li>
                <div className="divider my-0" />
                {user.role === "USER" ? null : (
                    <li>
                        {pathname.startsWith("/home") ? (
                            <Link href="/trainer">Switch to Trainer</Link>
                        ) : (
                            <Link href="/home">Switch to User</Link>
                        )}
                    </li>
                )}
                <li>
                    <a onClick={signOutHandler}>Sign Out</a>
                </li>
            </ul>
        </div>
    )
}

export default HeaderDropdown
