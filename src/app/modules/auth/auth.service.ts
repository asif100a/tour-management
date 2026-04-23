import bcrypt from "bcryptjs";
import AppError from "../../errorHandlers/AppError.js";
import { IsActive, type IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";
import httpStatusCode from 'http-status-codes'
import { createUserTokens } from "../../utils/userModels.js";
import { generateToken, verifyToken } from "../../utils/jwt.js";
import { envConfig } from "../../config/env.js";
import type { JwtPayload } from "jsonwebtoken";

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

    const userToken = createUserTokens(isExistUser)

    delete isExistUser.password;

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: isExistUser
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, envConfig.JWT_REFRESH_TOKEN) as JwtPayload


    const isExistUser = await User.findOne({ email: verifiedRefreshToken.email } as { email: string })
    if (!isExistUser) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, 'This user doesn\'t exist')
    }
    if (isExistUser.isActive === IsActive.BLOCKED || isExistUser.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, `This user is ${isExistUser.isActive}`)
    }
    if (isExistUser.isDeleted) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, 'This user is deleted')
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
    credentialLogin,
    getNewAccessToken
}