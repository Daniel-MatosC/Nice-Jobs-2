import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";
import { IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";

const updateUserService = async (
  { name, email, password, isPremium, isOffering }: IUserUpdate,
  id: string
): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    isPremium: isPremium ? isPremium : findUser.isPremium,
    isOffering: isOffering ? isOffering : findUser.isOffering,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const user = await userRepository.findOneBy({
    id,
  });
  return user!;
};
export default updateUserService;
