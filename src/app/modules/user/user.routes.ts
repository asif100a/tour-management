import { Router, type NextFunction, type Request, type Response } from "express";
import type { ZodType } from "zod";
import { UserController } from "./user.controller.js";
import { createUserZodSchema } from "./user.validation.js";

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
router.get('/all-user', UserController.getAllUser);

export const UserRoutes = router;
