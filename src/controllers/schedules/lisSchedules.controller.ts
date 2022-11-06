import { Request, Response } from "express";
import listSchedulesService from "../../services/schedules/listScheludes.service";

const listSchedulesController = async (req: Request, res: Response) => {
    const schedules = await listSchedulesService();

    return res.json({ message: "Schedules", schedules });
};

export default listSchedulesController;
