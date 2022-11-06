import { Request, Response } from "express";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
  const schedule= req.body;

  const newSchedule = await createScheduleService(schedule, req.user.userId as string);

  return res.status(201).json(newSchedule);
};

export default createScheduleController;
