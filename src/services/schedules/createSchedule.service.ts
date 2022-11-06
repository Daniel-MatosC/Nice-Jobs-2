import { IScheduleRequest } from '../../interfaces/schedules/index';
import { Schedules } from '../../entities/schedules.entity';
import AppDataSource from "../../data-source";

const createScheduleService = async (schedule:IScheduleRequest, userID:string) => {
    const scheduleRepository = AppDataSource.getRepository(Schedules);

}

export default createScheduleService;