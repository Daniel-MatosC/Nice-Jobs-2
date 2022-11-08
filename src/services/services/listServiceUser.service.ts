import { User } from './../../entities/user.entity';
import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entity";
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


  const serviceAll = findAllservices.filter((service) => {
    return service.user.id === userId.id;
  });

  if (!serviceAll) {
    throw new AppError("Service not found");
  }
  const service : Array<any>= serviceAll.map((service) => {
    const { user, ...rest } = service;
    return rest; 
  });
  
 return service;
};
export default listServiceUserService;
