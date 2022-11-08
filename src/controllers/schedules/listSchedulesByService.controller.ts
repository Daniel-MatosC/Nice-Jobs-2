import { Request, Response } from "express";
import listSchedulesByService from "../../services/schedules/listSchedulesByService.service";

const listScheduleByServiceController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const schedule = await listSchedulesByService(id);

    return res.status(200).json(schedule);
    
   
}

export default listScheduleByServiceController;