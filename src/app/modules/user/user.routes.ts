import { Router, type NextFunction, type Request, type Response } from "express";
import type { ZodType } from "zod";
import { UserController } from "./user.controller.js";
import { createUserZodSchema } from "./user.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
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
router.get('/all-user', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUser);
router.patch('/:id', checkAuth(...Object.values(Role)), UserController.updateUser)

export const UserRoutes = router;
