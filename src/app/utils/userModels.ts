import type { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config/env.js";
import AppError from "../errorHandlers/AppError.js";
import { IsActive, type IUser } from "../modules/user/user.interface.js";
import { User } from "../modules/user/user.model.js";
import { generateToken, verifyToken } from "./jwt.js";
import httpStatusCode from 'http-status-codes'

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, envConfig.JWT_ACCESS_SECRET, envConfig.JWT_ACCESS_EXPIRES_IN)
    const refreshToken = generateToken(jwtPayload, envConfig.JWT_REFRESH_TOKEN, envConfig.JWT_REFRESH_EXPIRES_IN)

    return {
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async(refreshToken: string) => {
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

    return accessToken
}