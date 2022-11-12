// change isDone to false

import { Schedules } from './../../entities/schedules.entity';
import AppDataSource from "../../data-source";
import { AppError } from '../../errors/appError';

const changeIsDoneSchedule = async (id: string) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedule = await schedulesRepository.findOneBy({ id });

    if (!schedule) {
        throw new AppError("Schedule not found");
    }
    if (schedule.isDone === true) {
        throw new AppError("Schedule already done");
    }

    const scheduleUpdated = {
        isDone: true,
    };

    await schedulesRepository.update(schedule.id, scheduleUpdated);

    const scheduleUpdatedReturn = await schedulesRepository.findOne({
        where: { id },
        relations: {
            user: true,
            services: true
        }
    });

    return {
        id: scheduleUpdatedReturn!.id,
        date: scheduleUpdatedReturn!.date,
        hour: scheduleUpdatedReturn!.hour,
        isDone: scheduleUpdatedReturn!.isDone,
        user: {
            id: scheduleUpdatedReturn!.user.id,
            name: scheduleUpdatedReturn!.user.name,
            email: scheduleUpdatedReturn!.user.email,
        },
        services: {
            id: scheduleUpdatedReturn!.services.id,
            owner: scheduleUpdatedReturn!.services.serviceOwner,
            name: scheduleUpdatedReturn!.services.serviceName,
            description: scheduleUpdatedReturn!.services.description,
            category: scheduleUpdatedReturn!.services.category,
        },
    };
}

export default changeIsDoneSchedule;