import { ensureIsOffering } from './../middlewares/ensureIsOffering.middleware';
import { ensureAuth } from './../middlewares/ensureAuth.middleware';
import { Router } from "express";
import createScheduleController from "../controllers/schedules/createSchedule.controller";
import listSchedulesController from '../controllers/schedules/lisSchedules.controller';
import listOneScheduleController from '../controllers/schedules/listOneSchedules.controller';
import listScheduleByServiceController from '../controllers/schedules/listSchedulesByService.controller';
import changeIsDoneScheduleController from '../controllers/schedules/changeIsDoneSchedule.controller';

const schedulesRoutes = Router();

schedulesRoutes.post("/", ensureAuth,ensureIsOffering, createScheduleController);
schedulesRoutes.get("/", ensureAuth, listSchedulesController);
schedulesRoutes.patch("/:id", ensureAuth, changeIsDoneScheduleController);
schedulesRoutes.get("/:id", ensureAuth, listOneScheduleController);
schedulesRoutes.get("/services/:id", ensureAuth,ensureIsOffering, listScheduleByServiceController);

export default schedulesRoutes;
