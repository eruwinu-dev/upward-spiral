import type { NextApiRequest, NextApiResponse } from "next"

export interface DataKey {
    id: string
    name: string
}

type Data = {
    data: DataKey[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const data: DataKey[] = Array.from([1, 2, 3], (x) => ({
        id: `${x}`,
        name: `Data Point ${x}`,
    }))

    res.status(200).json({ data })
}

export default handler
