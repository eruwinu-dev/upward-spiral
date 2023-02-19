import { getUser } from "@/lib/getUser"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {}

const Home = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <section>Home</section>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await getUser(context)

    if (!user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {
            user,
        },
    }
}

export default Home
