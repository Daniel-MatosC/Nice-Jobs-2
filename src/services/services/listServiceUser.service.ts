import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entity";
import { AppError } from "../../errors/appError";


const listServiceUserService = async (id: string): Promise<Services[]> => {
    const serviceRepository = AppDataSource.getRepository(Services);
    
    const service = await serviceRepository.find({ where: { serviceOwner: id } });
    
    if(!service) {
        throw new AppError('Service not found');
    }
    
    return service;
}
export default listServiceUserService;