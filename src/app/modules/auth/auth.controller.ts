import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatusCode from 'http-status-codes'
import { AuthServices } from "./auth.service.js";
import AppError from "../../errorHandlers/AppError.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import { createUserTokens } from "../../utils/userModels.js";
import type { IUser } from "../user/user.interface.js";
import { envConfig } from "../../config/env.js";

const credentialLogin = catchAsync(async (req: Request, res: Response) => {
    const loginInfo = await AuthServices.credentialLogin(req.body)

    setAuthCookie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'User logged in successfully',
        data: loginInfo
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, "No refresh token received from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'New access token retrieved successfully',
        data: tokenInfo
    })
})

const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'User logged out successfully',
        data: null
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user;

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'User password changed successfully',
        data: null
    })
})

const googleCallback = catchAsync(async (req: Request, res: Response) => {
   const user = req.user;
   if(!user) {
    throw new AppError(httpStatusCode.StatusCodes.NOT_FOUND, 'User not found!')
   }

   const tokenInfo = createUserTokens(user as Partial<IUser>)

   setAuthCookie(res, tokenInfo)

    res.redirect(envConfig.FRONTEND_URL)
})

export const AuthController = {
    credentialLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallback
}