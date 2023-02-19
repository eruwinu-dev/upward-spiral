import { getUser } from "@/lib/getUser"
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
			<section></section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const user = await getUser(context)

	if (user) {
		return {
			redirect: {
				destination: "/home",
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

