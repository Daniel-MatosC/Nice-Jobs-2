import { ensureAuth } from './../middlewares/ensureAuth.middleware';
import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("",ensureAuth, listUsersController);
userRoutes.patch("/:id",ensureAuth, updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
