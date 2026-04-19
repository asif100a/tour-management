import { Router, type NextFunction, type Request, type Response } from "express";
import type { ZodType } from "zod";
import { UserController } from "./user.controller.js";
import { createUserZodSchema } from "./user.validation.js";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import AppError from "../../errorHandlers/AppError.js";
import httpStatusCode from 'http-status-codes'
import { Role } from "./user.interface.js";

const router = Router();

const validateRequest = (zodSchema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchema.parseAsync(req.body);
        next();
    } catch (error) {
        console.error('Validation error:', error);
        next(error);
    }
};

router.post('/register', validateRequest(createUserZodSchema), UserController.createUser);
router.get('/all-user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization
        if (!accessToken) throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'No token received')

        const verifyToken = jwt.verify(accessToken, 'secret')
        // if (!verifyToken) throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized')
        if((verifyToken as JwtPayload).role !== Role.ADMIN || Role.SUPER_ADMIN) {
             throw new AppError(httpStatusCode.StatusCodes.FORBIDDEN, 'You are not authorized');
        }

        console.log("verifyToken -------------> ", verifyToken)
        next()
    } catch (error) {
        console.log("❌ token verification failed: ", error)
        next(error)
    }
}, UserController.getAllUser);

export const UserRoutes = router;
