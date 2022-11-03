import AppDataSource from "../../data-source";

import { Services } from "../../entities/services.entity";
import { Description } from "../../entities/description.entity";

import { IServiceRequest, IService } from "../../interfaces/services";

const createServiceService = async ({
  serviceName,
  serviceOwner,
  isActive,
  description,
  category,
}: IServiceRequest) => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const descriptionRepository = AppDataSource.getRepository(Description);

  const service = new Services();
  service.serviceName = serviceName;
  service.serviceOwner = serviceOwner;
  service.isActive = isActive;
  service.description = description;
  service.category = category;
  service.isActive = true;
  service.createdAt = new Date();
  service.updatedAt = new Date();
  service.id;

  serviceRepository.create(service);
  await serviceRepository.save(service);

  const serviceDescription = new Description();
  serviceDescription.serviceDescription =
    service.description.serviceDescription;
  serviceDescription.serviceValue = service.description.serviceValue;
  serviceDescription.atuationArea = service.description.atuationArea;
  serviceDescription.id;

  descriptionRepository.create(serviceDescription);
  await descriptionRepository.save(serviceDescription);

  return service;
};

export default createServiceService;
