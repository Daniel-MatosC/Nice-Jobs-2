import { Services } from './../../entities/services.entity';
import { Schedules } from './../../entities/schedules.entity';
import AppDataSource from "../../data-source";
import { AppError } from '../../errors/appError';

const listSchedulesByService = async (id: string) => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);
    const ServicesRepository = AppDataSource.getRepository(Services);

    const service = await ServicesRepository.findOneBy({ id });

    if (!service) {
        throw new AppError("Service not found");
    }

    const schedulesAll = await schedulesRepository.find({
        relations: {
            services: true,
        },
    });

    const schedule = schedulesAll.filter((schedule) => {
        return schedule.services.id === service.id;
    });

    return schedule.map((schedule) => {
        return {
            id: schedule.id,
            date: schedule.date,
            hour: schedule.hour,
            user: {
                id: schedule.user.id,
                name: schedule.user.name,
                email: schedule.user.email,
            },
            services: {
                id: schedule.services.id,
                owner: schedule.services.serviceOwner,
                name: schedule.services.serviceName,
                description: schedule.services.description,
                category: schedule.services.category,
            },
        };
    });
} 

export default listSchedulesByService;