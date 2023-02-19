import { signIn, signOut, useSession } from "next-auth/react"
import React, { MouseEvent } from "react"

type Props = {}

const Header = ({}: Props) => {
	const { status, data: session } = useSession()

	const signInHandler = async (event: MouseEvent<HTMLButtonElement>) => await signIn("google")
	const signOutHandler = async (event: MouseEvent<HTMLButtonElement>) => await signOut()

	let user = session?.user

	return (
		<header>
			<nav>
				<div></div>
				<ul>
					<li>
						{status === "loading" ? (
							<></>
						) : status === "authenticated" ? (
							<div className="sign-out-item">
								<span>{user?.email || ""}</span>
								<button type="button" onClick={signOutHandler}>
									Sign Out
								</button>
							</div>
						) : (
							<button type="button" onClick={signInHandler}>
								Sign In
							</button>
						)}
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header

