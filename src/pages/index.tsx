import SignInDialog from "@/components/Landing/SignInDialog"
import Header from "@/components/Layout/Header"
import { checkUser } from "@/utils/checkUser"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {}

const Landing = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Landing</title>
            </Head>
            <Header />
            <section></section>
            <SignInDialog />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    if (user) {
        return {
            redirect: {
                destination: "/user",
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

export default Landing
