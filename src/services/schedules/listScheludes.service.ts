import { Schedules } from "./../../entities/schedules.entity";
import AppDataSource from "../../data-source";

const listSchedulesService = async () => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = await schedulesRepository.find({
       // where: { isDone: false },
        relations: ["user", "services"],
    });

    return schedules.map((schedule) => {
        const { password, ...user } = schedule.user;
        const { user: userServices, ...services } = schedule.services;
        return {
            ...schedule,
            user,
            services,
        };
    });
};

export default listSchedulesService;
