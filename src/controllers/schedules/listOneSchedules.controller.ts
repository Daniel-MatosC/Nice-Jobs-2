import { Request, Response } from "express";
import listOneScheduleService from "../../services/schedules/listOneSchedules.service";


const listOneScheduleController = async (req: Request, res: Response) => {
    const {id} = req.params;

    const schedule = await listOneScheduleService(id);

    return res.status(200).json(schedule);
    
};

export default listOneScheduleController;
