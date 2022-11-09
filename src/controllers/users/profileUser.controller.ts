import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import profileUserService from "../../services/users/profileUser.service";

const profileUserController = async (req: Request, res: Response) => {

    const userId = req.user.userId;
    const user = await profileUserService(userId as string);
    return res.json({message: "Dados do usuário" , user :instanceToPlain(user)});
};
export default profileUserController;
