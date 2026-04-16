import type { Request, Response } from "express";
import httpStatusCode from 'http-status-codes'
import { UserServices } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserServices.createUser(req.body);

        res.status(httpStatusCode.StatusCodes.CREATED).json({
            message: 'User created successfully',
            user
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('❌ Something went wrong!: ', error);
        res.status(httpStatusCode.StatusCodes.BAD_REQUEST).json({
            message: `Something went wrong! ${error?.message}`
        })
    }
}

export const UserController = {
    createUser
}