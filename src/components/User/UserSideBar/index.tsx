import HeaderDropdown from "@/components/Layout/Header/HeaderDropdown"
import { usePageRender } from "@/hooks/custom/usePageRender"
import Link from "next/link"
import React from "react"
import ProgramsList from "../ProgramsList"

type Props = {}

const UserSideBar = (props: Props) => {
    const { pathname } = usePageRender()

    return (
        <>
            <div className="w-full font-semibold rounded-lg p-4">
                <Link href="/" shallow>
                    <span className="font-logo text-xl text-accent">
                        Upward Spiral
                    </span>
                </Link>
            </div>
            <HeaderDropdown />
            {pathname.startsWith("/account") ? null : <ProgramsList />}
        </>
    )
}

export default UserSideBar
