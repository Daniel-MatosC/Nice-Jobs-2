//router session
import { Router } from "express";
import createSessionController from "../controllers/sessions/createSession.controller";

const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);

export default sessionRoutes;
