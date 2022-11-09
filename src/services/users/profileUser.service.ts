import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const profileUserService = async (id: string): Promise<any> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
    where : {
        id
    },
    });

    return user;

};

export default profileUserService;
