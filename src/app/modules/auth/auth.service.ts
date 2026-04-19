import bcrypt from "bcryptjs";
import AppError from "../../errorHandlers/AppError.js";
import type { IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";
import httpStatusCode from 'http-status-codes'
import { generateToken } from "../../utils/jwt.js";
import { envConfig } from "../../config/env.js";

const credentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isExistUser = await User.findOne({ email } as { email: string })
    if (!isExistUser) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, 'This user doesn\'t exist')
    }

    if (!password || !isExistUser.password) {
        throw new AppError(
            httpStatusCode.StatusCodes.BAD_REQUEST,
            "This account cannot be logged in with email/password"
        );
    }

    const isMatchedPassword = await bcrypt.compare(password as string, isExistUser.password as string)
    if (!isMatchedPassword) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, 'Invalid password')
    }

    const jwtPayload = {
        userId: isExistUser._id,
        email: isExistUser.email,
        role: isExistUser.role
    }
    const accessToken = generateToken(jwtPayload, envConfig.JWT_ACCESS_SECRET, envConfig.JWT_ACCESS_EXPIRES_IN)

    return {
        accessToken
    }
}

export const AuthServices = {
    credentialLogin
}