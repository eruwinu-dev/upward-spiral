import type { NextApiRequest, NextApiResponse } from "next"


type Data = {}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { programId, habitSlug } = req.body

    const habit = await 

    res.status(200).json({ date: "" })
}

export default handler
