import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/session";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";


const CreateSessionService = async ({
    email,
    password,
}: IUserLogin): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: { email },
    });
    if (!user) {
        throw new AppError("User not found",403);
    }

    if (!user.password) {
        throw new AppError("Password / Email is incorrect",403);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError("Incorrect email/password combination",403);
    }
    const token = jwt.sign({ email: email, isActive: user.isActive, isPremium: user.isPremium,isOffering:user.isOffering }, String(process.env.SECRET_KEY), {
        expiresIn: "24h",
        subject: user.id,
    });
    
    return token;
}

export default CreateSessionService;