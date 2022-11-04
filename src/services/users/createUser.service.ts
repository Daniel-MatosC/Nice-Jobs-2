import AppDataSource from "../../data-source";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";

const createUserService = async ({
  name,
  email,
  isPremium,
  isOffering,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const userExists = await userRepository.findOneBy({ email });

  if (userExists) {
    throw new AppError("User already exists");
  }
  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    name,
    email,
    isPremium,
    isOffering,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};
export default createUserService;
