import type { ErrorRequestHandler } from "express"
import { envConfig } from "../config/env.js"
import AppError from "../errorHandlers/AppError.js";

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    void req
    void next

    let statusCode = 500
    let message = 'Something went wrong'

    if (error instanceof AppError) {
        statusCode = error.statusCode
        message = error.message
    } else if (error instanceof Error) {
        message = error.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: {
            name: error instanceof Error ? error.name : 'UnknownError',
            statusCode
        },
        stack: envConfig.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
    })
}
