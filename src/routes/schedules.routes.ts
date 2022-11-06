import { ensureAuth } from './../middlewares/ensureAuth.middleware';
import { Router } from "express";
import createScheduleController from "../controllers/schedules/createSchedule.controller";
import listSchedulesController from '../controllers/schedules/lisSchedules.controller';

const schedulesRoutes = Router();

schedulesRoutes.post("/", ensureAuth, createScheduleController);
schedulesRoutes.get("/", ensureAuth, listSchedulesController);

export default schedulesRoutes;
