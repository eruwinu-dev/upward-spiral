import TestForm from "@/components/TestForm"
import { useGetData } from "@/hooks/useGetData"
import Head from "next/head"
import React from "react"

type Props = {}

const Query = (props: Props) => {
    const {
        data: { data },
        isLoading,
    } = useGetData()

    return (
        <>
            <Head>
                <title>Scratch React Query</title>
            </Head>
            <main>
                <section>
                    <h1 className="text-2xl font-semibold">
                        Maintaining Server State using React-Query
                    </h1>
                    {isLoading || !data ? (
                        <div>Loading ... </div>
                    ) : (
                        <div>
                            {data.map((data) => (
                                <div key={data.id}>{data.name}</div>
                            ))}
                        </div>
                    )}
                </section>
                <section className="w-full min-h-screen inline-flex items-center">
                    <TestForm />
                </section>
            </main>
        </>
    )
}

export default Query
