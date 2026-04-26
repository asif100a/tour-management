import bcrypt from "bcryptjs";
import AppError from "../../errorHandlers/AppError.js";
import { type IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";
import httpStatusCode from 'http-status-codes'
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userModels.js";
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
    const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken
    }
}

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
    const user = await User.findById(decodedToken.userId)

    const isUserPasswordMatched = await bcrypt.compare(oldPassword, user?.password as string)
    if(!isUserPasswordMatched) {
        throw new AppError(httpStatusCode.StatusCodes.UNAUTHORIZED, 'Old password doesn\'t match')
    }

    (user as IUser).password =  await bcrypt.hash(newPassword, Number(envConfig.BCRYPT_SALT))
    user?.save()
}

export const AuthServices = {
    credentialLogin,
    getNewAccessToken,
    resetPassword
}