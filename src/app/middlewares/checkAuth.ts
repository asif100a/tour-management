import type { NextFunction, Request, Response } from "express";
import AppError from "../errorHandlers/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import type { JwtPayload } from "jsonwebtoken";
import httpStatusCode from 'http-status-codes'
import { envConfig } from "../config/env.js";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization
        if (!accessToken) throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'No token received')

        const verifiedToken = verifyToken(accessToken, envConfig.JWT_ACCESS_SECRET) as JwtPayload
        // if (!verifyToken) throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized')
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized');
        }
        req.user = verifiedToken;
        console.log("verifyToken -------------> ", verifiedToken)
        next()
    } catch (error) {
        console.log("❌ token verification failed: ", error)
        next(error)
    }
}