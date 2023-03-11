import AccountForm from "@/components/Account/AccountForm"
import EditUserDialog from "@/components/Account/EditAccountDialog"
import UserSideBar from "@/components/User/UserSideBar"
import { checkUser } from "@/utils/checkUser"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {}

const Account = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Account Settings | Upward Spiral</title>
            </Head>

            <section className="grid grid-cols-12 grid-flow-row min-h-screen max-h-screen">
                <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 col-span-5 border-r-2 px-2 flex flex-col items-start justify-start space-y-2">
                    <UserSideBar />
                </div>
                <div className="lg:col-span-10 md:col-span-9 sm:col-span-8 col-span-7 relative grid grid-cols-12 grid-flow-row gap-x-4">
                    <AccountForm />
                </div>
            </section>
            <EditUserDialog />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    if (!user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    context.res.setHeader("Set-Cookie", [
        `userId=${user.id}; Max-Age=36000; Path=/`,
        `timezone=${user.timezone}; Max-Age=36000; Path=/`,
    ])

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => user,
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Account
