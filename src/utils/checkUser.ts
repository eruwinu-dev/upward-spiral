import { getUser } from "@/lib/user/getUser"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"

export const checkUser = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)

    if (!session || !session.user || !session.user.email) return null

    const user = await getUser(session.user.email)

    return user
}
