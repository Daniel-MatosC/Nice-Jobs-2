import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { instanceToPlain } from "class-transformer";
import { IUserUpdate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const updateUserController = async (req: Request, res: Response) => {
  
  if (Object.keys(req.body).includes("isActive")) {
    throw new AppError( "You can't update this field", 401);
  }
  if (Object.keys(req.body).includes("id")) {
    throw new AppError( "You can't update this field", 401);
  }
  
  const user: IUserUpdate = req.body;
  const id: string = req.params.id;
  const updatedUser = await updateUserService(user, id);

  return res.status(200).json(instanceToPlain(updatedUser));
};
export default updateUserController;
