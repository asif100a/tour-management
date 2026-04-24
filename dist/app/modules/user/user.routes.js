import { Router } from "express";
import { UserController } from "./user.controller.js";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "./user.interface.js";
const router = Router();
const validateRequest = (zodSchema) => async (req, res, next) => {
    try {
        req.body = await zodSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        console.error('Validation error:', error);
        next(error);
    }
};
router.post('/register', validateRequest(createUserZodSchema), UserController.createUser);
router.get('/all-user', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getAllUser);
router.patch('/:id', validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserController.updateUser);
export const UserRoutes = router;
//# sourceMappingURL=user.routes.js.map