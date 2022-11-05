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
        throw new AppError("User not found");
    }

    if (!user.password) {
        throw new Error("Password / Email is incorrect");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError("Password/Email does not match");
    }
    const token = jwt.sign({ email: email, isActive: user.isActive, isPremium: user.isPremium,isOffering:user.isOffering }, String(process.env.SECRET_KEY), {
        expiresIn: "24h",
        subject: user.id,
    });

    console.log(token);
    
    return token;
}

export default CreateSessionService;