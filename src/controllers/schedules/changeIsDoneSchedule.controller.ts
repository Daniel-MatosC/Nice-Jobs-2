import { Request, Response } from 'express';
import changeIsDoneScheduleService from '../../services/schedules/changeIsDoneSchedules.service';


const changeIsDoneScheduleController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const schedule = await changeIsDoneScheduleService(id);

    return res.json({ message: "Schedule updated", schedule });
};

export default changeIsDoneScheduleController;
