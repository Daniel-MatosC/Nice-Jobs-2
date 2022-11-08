import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const listServiceUserService = async (id: string): Promise<Services[]> => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const userRepository = AppDataSource.getRepository(User);

  const userId = await userRepository.findOne({
    where: { id: id },
  });

  if (!userId) {
    throw new AppError("User not found");
  }

  const findAllservices = await serviceRepository.find({
    relations: {
      user: true,
      category: true,
      description: true,
    },
  });


  const service = findAllservices.filter((service) => {
    return service.user.id === userId.id;
  });

  if (!service) {
    throw new AppError("Service not found");
  }

  return service;
};
export default listServiceUserService;
