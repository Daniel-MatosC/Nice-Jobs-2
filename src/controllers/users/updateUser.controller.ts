import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { instanceToPlain } from "class-transformer";
import { IUserUpdate } from "../../interfaces/users";

const updateUserController = async (req: Request, res: Response) => {
  const user: IUserUpdate = req.body;
  const id: string = req.params.id;
  const updatedUser = await updateUserService(user, id);

  return res.json(instanceToPlain(updatedUser));
};
export default updateUserController;
