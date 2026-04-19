import type { NextFunction, Request, Response } from "express";
import httpStatusCode from 'http-status-codes'
import { UserServices } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.CREATED,
        message: 'User created successfully',
        data: user
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUser();

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'Users retrieved successfully',
        data: result.data,
        meta: result.meta
    })
})

export const UserController = {
    createUser,
    getAllUser
}
