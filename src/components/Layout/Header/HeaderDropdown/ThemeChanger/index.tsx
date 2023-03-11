import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"

type Props = {}

const ThemeChanger = (props: Props) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="form-control w-full py-0.5 px-2.5 inline-flex">
            <label className="label cursor-pointer w-full">
                <span className="label-text">Dark Mode</span>
                <input
                    type="checkbox"
                    className="toggle"
                    onChange={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                    }
                    checked={theme === "dark"}
                />
            </label>
        </div>
    )
}

export default ThemeChanger
