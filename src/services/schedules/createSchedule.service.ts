import { IScheduleRequest } from '../../interfaces/schedules/index';
import { Schedules } from '../../entities/schedules.entity';
import AppDataSource from "../../data-source";
import { AppError } from '../../errors/appError';
import { User } from '../../entities/user.entity';
import { Services } from '../../entities/services.entity';

const createScheduleService = async (schedule:IScheduleRequest, userID:string) => {
    const scheduleRepository = AppDataSource.getRepository(Schedules);
    const userRepository =  AppDataSource.getRepository(User)
    const serviceRepository = AppDataSource.getRepository(Services)

    if (!schedule) {
        throw new AppError("Check the required fields");
    }
    const user = await userRepository.findOneBy({ id: userID });

    if (!user) {
        throw new AppError("User not found");
    }
    const hour = +schedule.hour.split(" : ")[0];

    if (hour < 8 || hour >= 22) {
        throw new AppError("Schedule during business hours");
    }
    const service = await serviceRepository.findOneBy({
        id: schedule.serviceId,
    });

    if(!service){
        throw new AppError("Service not found");
    }

    const scheduleExists = await scheduleRepository.findOne({
        where: {
            date: schedule.date,
            hour: schedule.hour,
        },
    });
    if (scheduleExists) {
        throw new AppError("Date or hour already exists",403 );
    }

    const schedueleInstance = new Schedules();
    const newSchedule = scheduleRepository.create({
        ...schedueleInstance,
        ...schedule,
        user:user,
        services:service
    });

    await scheduleRepository.save(newSchedule);

}

export default createScheduleService;