import SignInDialog from "@/components/Landing/SignInDialog"
import Header from "@/components/Layout/Header"
import useUserContext from "@/context/UserState"
import { checkUser } from "@/utils/checkUser"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { MouseEvent } from "react"

type Props = {}

const Landing = ({}: Props) => {
    const { toggleDialog } = useUserContext()

    const toggleSignInDialogHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => toggleDialog("signIn")

    return (
        <>
            <Head>
                <title>Upward Spiral - Your Ultimate Habit Companion.</title>
            </Head>
            <Header />
            <section className="min-h-screen max-h-screen grid grid-cols-1 grid-flow-row">
                <div className="row-span-3 mx-auto max-w-xl text-center grid grid-cols-1 grid-flow-row aspect-square place-items-center place-content-center gap-4 rounded-full p-8">
                    <h1 className="text-5xl font-logo font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent to-white leading-snug">
                        Stay on track and reach new heights.
                    </h1>
                    <div className="max-w-lg text-lg leading-loose font-semibold">
                        Upward Spiral makes it easy to set and track goals, log
                        progress, and stay motivated.
                    </div>
                    <button
                        className="btn btn-lg btn-outline btn-accent"
                        onClick={toggleSignInDialogHandler}
                    >
                        Get Started
                    </button>
                </div>
                <div className="row-span-3"></div>
            </section>
            <section className="min-h-screen max-h-screen">
                <div className="mx-auto w-10/12 grid grid-cols-3 grid-flow-row place-items-center p-4 gap-4">
                    <div className="text-center w-9/12 col-span-3 grid grid-cols-1 grid-flow-row gap-4">
                        <h2 className="text-3xl font-bold">
                            How will this help me?
                        </h2>
                        <span className="w-8/12 mx-auto text-lg leading-8 text-center text-content">
                            Habits are built over time. With the help of our
                            coaches, we can craft a proven program for you while
                            giving leeway for your own personal goals.
                        </span>
                    </div>
                    <div className="w-full h-auto grid grid-cols-1 grid-flow-row gap-2 p-4">
                        <div className="w-9/12 aspect-square bg-base-300" />
                        <span className="text-xl font-semibold mt-4">
                            1. Enroll in a program.
                        </span>
                        <p className="text-lg text-content">
                            Our coaches will create a general program for you.
                            You can customize it by adding more of your personal
                            habits.
                        </p>
                    </div>
                    <div className="w-full h-auto grid grid-cols-1 grid-flow-row gap-2 p-4">
                        <div className="w-9/12 aspect-square bg-base-300" />
                        <span className="text-xl font-semibold mt-4">
                            2. Grind them out.
                        </span>
                        <p className="text-lg text-content">
                            Our goal is to make you feel that habits are an
                            everyday part of life, incorporated in your system.
                        </p>
                    </div>
                    <div className="w-full h-auto grid grid-cols-1 grid-flow-row gap-2 p-4">
                        <div className="w-9/12 aspect-square bg-base-300" />
                        <span className="text-xl font-semibold mt-4">
                            3. See how much you have done.
                        </span>
                        <p className="text-lg text-content">
                            Track your development through the detailed reports
                            and visuals provided by Upward Spiral.
                        </p>
                    </div>
                </div>
            </section>
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
