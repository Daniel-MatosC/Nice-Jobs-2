import AppDataSource from "../../data-source";

import { Services } from "../../entities/services.entity";
import { Description } from "../../entities/description.entity";
import { Categories } from "../../entities/categories.entity";

import { IServiceRequest, IDescription } from "../../interfaces/services";

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

  const categories = await categoryRepository.find();

  const categoryId = categories.find((e) => e.id === category);

  const finalDescription = await descriptionRepository.findOneBy({
    serviceDescription: description.serviceDescription,
    serviceValue: description.serviceValue,
    atuationArea: description.atuationArea,
  });

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
