import { Schedules } from './../../entities/schedules.entity';
import { Services } from "../../entities/services.entity";
import AppDataSource from "../../data-source";

import { IServiceDelete } from "../../interfaces/services";
import { AppError } from "../../errors/appError";

const deleteServiceService = async ({ id }: IServiceDelete) => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const schedules = AppDataSource.getRepository(Schedules);

  const scheduleFind = await schedules.findOne({
    where: { services:{
      id
    } }, 
  });

  if(scheduleFind){
    throw new AppError("This service belongs to a schedule, cannot be deleted");
  }

  const findService = await serviceRepository.findOneBy({ id });

  if (!findService) {
    throw new AppError("Service not found", 404);
  }

  await serviceRepository.delete(findService);

  const service = await serviceRepository.findOneBy({
    id,
  });

  return service;
};

export default deleteServiceService;
