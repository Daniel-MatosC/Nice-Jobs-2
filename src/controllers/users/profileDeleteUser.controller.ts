import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const profileDeleteUserController = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  await deleteUserService(userId as string);
  return res.status(204).send();
};
export default profileDeleteUserController;
