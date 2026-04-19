import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatusCode from 'http-status-codes'
import { AuthServices } from "./auth.service.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'User logged in successfully',
        data: loginInfo
    })
})

export const AuthController = {
    credentialLogin
}