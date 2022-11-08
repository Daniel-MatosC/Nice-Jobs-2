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

  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
  );
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email", 400);
  }

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!passwordRegex.test(password)) {
    throw new AppError(
      "Password must have at least 8 digits, uppercase and lowercase, number and special character",
      400
    );
  }

  if (password === "") {
    throw new AppError("Password is required");
  }

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
