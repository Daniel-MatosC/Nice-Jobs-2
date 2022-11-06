import { Services } from "./../../entities/services.entity";
import { Schedules } from "./../../entities/schedules.entity";
import AppDataSource from "../../data-source";

const listSchedulesService = async () => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = await schedulesRepository.find({
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

//return schedules;

export default listSchedulesService;
