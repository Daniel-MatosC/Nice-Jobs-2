import { Schedules } from "./../../entities/schedules.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";

const listOneScheduleService = async (id: string) => {
    

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedule = await schedulesRepository.findOne({
        where: {
            id: id,
        },
        relations: ["user", "services"],
    });

    if (!schedule) {
        throw new AppError("Schedule not found", 404);
    }

    const { password, createdAt, updatedAt,isActive, isPremium,isOffering, ...user } = schedule.user;
    const { user: userServices, ...service } = schedule.services;
    const { name, email, id: userId } = userServices;
    
    const scheduleResponse = {
        ...schedule,
        user: {
            name,
            email,
            id: userId,
        },
        services: {
            ...service,
        },
    }

    return scheduleResponse;
};
export default listOneScheduleService;
