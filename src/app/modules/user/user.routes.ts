import { Router, type NextFunction, type Request, type Response } from "express";
import { UserController } from "./user.controller.js";
import { createUserZodSchema } from "./user.validation.js";
import type { AnyZodObject } from "zod/v3";

const router = Router();

const validateRequest = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
try {
    req.body = await zodSchema.parseAsync(req.body);
    next();
} catch (error) {
    next(error)
    console.error('❌ Validation error: ', error)
}
}

router.post('/register', validateRequest(createUserZodSchema), UserController.createUser)
router.get('/all-user', UserController.getAllUser)

export const UserRoutes = router;
