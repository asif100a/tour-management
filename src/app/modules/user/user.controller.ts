import type { NextFunction, Request, Response } from "express";
import httpStatusCode from 'http-status-codes'
import { UserServices } from "./user.service.js";
import AppError from "../../errorHandlers/AppError.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body

        if (!name || !email) {
            throw new AppError(
                httpStatusCode.StatusCodes.BAD_REQUEST,
                'Name and email are required'
            )
        }

        const user = await UserServices.createUser(req.body);

        res.status(httpStatusCode.StatusCodes.CREATED).json({
            success: true,
            message: 'User created successfully',
            user
        })
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    createUser
}
