import React, { ReactNode } from "react"
import { Inter, Secular_One } from "@next/font/google"
import { UserProvider } from "@/context/UserState"

type Props = {
    children: ReactNode
}

const main = Inter({
    subsets: ["latin"],
    preload: true,
})

const logo = Secular_One({
    subsets: ["latin"],
    weight: ["400"],
    preload: true,
})

const Layout = ({ children }: Props) => {
    return (
        <UserProvider>
            <style jsx global>
                {`
                    :root {
                        --main-font: ${main.style.fontFamily};
                        --logo-font: ${logo.style.fontFamily};
                    }
                `}
            </style>
            {children}
        </UserProvider>
    )
}

export default Layout
