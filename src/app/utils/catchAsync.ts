import type { NextFunction, Request, Response } from "express"

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>

export const catchAsync =
    (fn: AsyncHandler) =>
        (req: Request, res: Response, next: NextFunction) => {
            return Promise.resolve(fn(req, res, next)).catch((error) => {
                console.log('Error occurred. Details:', error)
                next(error)
            })
        }
