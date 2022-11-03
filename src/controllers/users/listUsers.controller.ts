import listUsersService from "../../services/users/listUsers.service";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(instanceToPlain(users));
};
export default listUsersController;
