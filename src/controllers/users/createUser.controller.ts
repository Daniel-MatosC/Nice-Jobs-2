import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import createUserService from "../../services/users/createUser.service";
import { IUserRequest } from "../../interfaces/users";
import userCreateService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await userCreateService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

export default createUserController;
