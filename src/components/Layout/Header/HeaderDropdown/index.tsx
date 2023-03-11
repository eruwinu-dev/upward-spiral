import { usePageRender } from "@/hooks/custom/usePageRender"
import { useGetUser } from "@/hooks/user/useGetUser"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"

import ThemeChanger from "./ThemeChanger"

type Props = {}

const HeaderDropdown = (props: Props) => {
    const { role } = usePageRender()
    const { data: user } = useGetUser()

    const signOutHandler = async () => await signOut()

    if (!user) return <></>

    return (
        <div className="header-dropdown dropdown-hover w-full bg-base-200 rounded-lg">
            <label
                tabIndex={0}
                className="btn w-full btn-ghost inline-flex items-center justify-start space-x-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
                <span className="capitalize">{user.name}</span>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52 z-10"
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
                    <Link href="/account">Account</Link>
                </li>
                <li>
                    <ThemeChanger />
                </li>
                <div className="divider my-0" />
                {user.role === "USER" ? null : (
                    <li>
                        {role === "USER" ? (
                            <Link href="/trainer">Switch to Trainer</Link>
                        ) : (
                            <Link href="/user">Switch to User</Link>
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
