import {Request, Response} from "express"
import CreateSessionService from "../../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await CreateSessionService({ email, password });

    return res.json({ token });
}

export default createSessionController;