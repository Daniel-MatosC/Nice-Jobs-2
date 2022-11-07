import { Request, Response } from "express";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
  const schedule = req.body;
  const userID = req.user.userId;
  const newSchedule = await createScheduleService(schedule, userID as string);

  return res
    .status(201)
    .json({ message: "Schedule created", schedules: newSchedule });
};

export default createScheduleController;
