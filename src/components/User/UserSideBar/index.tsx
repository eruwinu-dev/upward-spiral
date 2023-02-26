import HeaderDropdown from "@/components/Layout/Header/HeaderDropdown"
import { useGetUser } from "@/hooks/user/useGetUser"
import Link from "next/link"
import React from "react"
import ProgramsList from "../ProgramsList"

type Props = {}

const UserSideBar = (props: Props) => {
    const { data: user } = useGetUser()

    if (!user) return <></>

    return (
        <>
            <div className="w-full font-semibold rounded-lg p-4">
                <Link href="/" shallow>
                    <span className="font-logo text-xl text-primary">
                        Upward Spiral
                    </span>
                </Link>
            </div>
            <HeaderDropdown />
            <ProgramsList />
        </>
    )
}

export default UserSideBar
