import { Services } from "../../entities/services.entity";
import AppDataSource from "../../data-source";

const listServicesService = async () => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const services = serviceRepository.find();

  return services;
};

export default listServicesService;
