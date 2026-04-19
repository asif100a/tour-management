import type { ErrorRequestHandler } from "express"
import { envConfig } from "../config/env.js"
import AppError from "../errorHandlers/AppError.js";
import { ZodError } from "zod";

export const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    void req
    void next

    let statusCode = 500
    let message = 'Something went wrong'

    if (error instanceof AppError) {
        statusCode = error.statusCode
        message = error.message
    } else if (error instanceof ZodError) {
        statusCode = 400
        const issues = error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
        }))
        message = 'Validation failed'
        return res.status(statusCode).json({
            success: false,
            message,
            error: {
                name: 'ZodError',
                statusCode
            },
            issues,
            stack: envConfig.NODE_ENV === 'development' ? error.stack : undefined
        })
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
