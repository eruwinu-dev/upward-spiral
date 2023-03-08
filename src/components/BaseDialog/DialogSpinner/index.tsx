import Spinner from "@/components/Spinner"
import React from "react"

type Props = {
    text: string
}

const DialogSpinner = ({ text }: Props) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Spinner />
            <p className="font-semibold mt-2">{text}</p>
        </div>
    )
}

export default DialogSpinner
