import Head from "next/head"
import React from "react"

type Props = {}

const Custom404 = (props: Props) => {
    return (
        <>
            <Head>
                <title>Not Found</title>
            </Head>
            <main>Not found</main>
        </>
    )
}

export default Custom404
