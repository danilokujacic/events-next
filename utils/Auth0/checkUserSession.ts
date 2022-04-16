import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "./index";

const checkUserSession = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await auth0.getSession(req,res);

    return user;
}

export default checkUserSession;