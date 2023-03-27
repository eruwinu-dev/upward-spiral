import Head from "next/head"
import Link from "next/link"
import React from "react"

type Props = {}

const Custom404 = (props: Props) => {
    return (
        <>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <main className="grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4">
                <h1 className="text-5xl font-extrabold">Page not found.</h1>
                <Link href="/">
                    <button
                        type="button"
                        className="link link-hover link-primary"
                    >
                        Go Back
                    </button>
                </Link>
            </main>
        </>
    )
}

export default Custom404
