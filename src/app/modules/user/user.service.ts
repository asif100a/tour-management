import bcrypt from "bcryptjs";
import AppError from "../../errorHandlers/AppError.js";
import { Role, type IAuthProvider, type IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import httpStatusCode from 'http-status-codes'
import { envConfig } from "../../config/env.js";
import type { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Pick<IUser, 'name' | 'email' | 'password' | 'phone' | 'address'>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(httpStatusCode.StatusCodes.CONFLICT, 'This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envConfig.BCRYPT_SALT))

    const authProvider: IAuthProvider = { provider: 'credentials', providerId: email }

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    })

    return user;
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const isExistUser = await User.findById(userId)
    if (!isExistUser) {
        throw new AppError(httpStatusCode.StatusCodes.NOT_FOUND, 'This user not found!')
    }

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized.')
        }
        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized.')
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized.')
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, envConfig.BCRYPT_SALT)
    }

    // Update User info
    const updatedUser = await User.findOneAndUpdate({ userId }, payload, { new: true, runValidators: true })

    return updatedUser;
}

const getAllUser = async () => {
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
    getAllUser,
    updateUser
}
