import bcrypt from "bcryptjs";
import AppError from "../../errorHandlers/AppError.js";
import type { IAuthProvider, IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import httpStatusCode from 'http-status-codes'

const createUser = async (payload: Pick<IUser, 'name' | 'email' | 'password' | 'phone' | 'address'>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(httpStatusCode.StatusCodes.CONFLICT, 'This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)

    const authProvider: IAuthProvider = { provider: 'credentials', providerId: email }

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    })

    return user;
}

const getAllUser = async() => {
    const users = await User.find({})

    const totalUsers = await User.countDocuments()

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
}

export const UserServices = {
    createUser,
    getAllUser
}
