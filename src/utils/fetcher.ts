export const fetcher = async (
    path: string,
    method: "GET" | "POST" | "PATCH" | "DELETE",
    body: string
) => {
    const result = await fetch(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
    })
    const data = await result.json()

    return data
}
