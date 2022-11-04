import { Services } from "../../entities/services.entity";
import AppDataSource from "../../data-source";

import { IServiceUpdate } from "../../interfaces/services";
import { AppError } from "../../errors/appError";

const updateServiceService = async ({
  serviceName,
  serviceOwner,
  description,
  categoryId,
  id,
}: IServiceUpdate) => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const findService = await serviceRepository.findOneBy({ id });

  if (!findService) {
    throw new AppError("Service not found", 404);
  }

  const serviceUpdated = {
    serviceName: serviceName || findService!.serviceName,
    serviceOwner,
    description,
    categoryId,
    updatedAt: new Date(),
  };

  await serviceRepository.update(findService!.id, serviceUpdated);

  const service = await serviceRepository.findOneBy({
    id,
  });

  return service;
};

export default updateServiceService;
