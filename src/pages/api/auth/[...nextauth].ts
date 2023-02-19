import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextApiHandler } from "next"
import prisma from "@/lib/prisma"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET || "",
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	events: {
		signIn: async (message) => {
			if (message.isNewUser) {
			}
		},
	},
}

