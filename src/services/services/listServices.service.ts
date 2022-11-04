import { Services } from "../../entities/services.entity";
import AppDataSource from "../../data-source";

const listServicesService = async () => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const services = await serviceRepository.find({
    relations: {
      description: true,
      category: true,
    },
  });

  return services;
};

export default listServicesService;
