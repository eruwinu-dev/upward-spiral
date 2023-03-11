import Layout from "@/components/Layout"
import "@/styles/globals.css"
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { useState } from "react"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { ThemeProvider } from "next-themes"

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <>
            <ThemeProvider
                defaultTheme="light"
                themes={["light", "dark"]}
                attribute="data-theme"
            >
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <SessionProvider session={pageProps.session}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                            <ReactQueryDevtools initialIsOpen={false} />
                        </SessionProvider>
                    </Hydrate>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}
