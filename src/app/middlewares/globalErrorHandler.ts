import type { NextFunction, Request, Response } from "express"
import { envConfig } from "../config/env.js"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const status = 500
    const message = error.message;

    res.status(status).json({
        success: false,
        message,
        error,
        stack: envConfig.NODE_ENV === 'development' ? error?.stack : null
    })
}