import AppDataSource from "../../data-source";

import { Services } from "../../entities/services.entity";
import { Description } from "../../entities/description.entity";
import { Categories } from "../../entities/categories.entity";

import { IServiceRequest, IDescription } from "../../interfaces/services";
import { AppError } from "../../errors/appError";
import { FindOperator } from "typeorm";

const createServiceService = async ({
  serviceName,
  serviceOwner,
  isActive,
  description,
  category,
}: IServiceRequest): Promise<Services> => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const descriptionRepository = AppDataSource.getRepository(Description);

  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryId = await categoryRepository.findOne({ where: { id: category } });

  if(!categoryId) {
    throw new AppError('Category not found');
  }

  const serviceDescription: IDescription =
    descriptionRepository.create(description);

  await descriptionRepository.save(serviceDescription);

  const service = serviceRepository.create({
    serviceName,
    serviceOwner,
    isActive,
    description: serviceDescription,
    category: categoryId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await serviceRepository.save(service);

  return service;
};

export default createServiceService;
