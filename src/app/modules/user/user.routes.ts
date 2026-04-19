import { Router, type NextFunction, type Request, type Response } from "express";
import { UserController } from "./user.controller.js";
import z from "zod";

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const createUserZodSchema = z.object({
        name: z
            .string({ error: "Name must be string" })
            .min(2, { message: "The name is too short, minimum 2 characters required" })
            .max(30, { message: "The name is too long, maximum 30 characters allowed" }),
        email: z.email().min(5, { message: 'Email must be at least 5 characters long' }),
        password: z
            .string({ error: "Password must be string" })
            .min(8, { message: "Password must be 8 characters long" })
            .regex(/^(?=.*[A-Z])/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/^(?=.*[@#$%^&*])/, {
                message: "Password must contain at least one special character",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password must contain at least one digit",
            })
            .optional(),
        phone: z
            .string({ error: "Phone number must be string" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
                message: "Phone number must be a Bangladeshi phone number",
            })
            .optional(),
        address: z
            .string({ error: "Address must be string" })
            .min(2, { message: "Address must be 2 characters long" })
            .max(100, { message: "Address too long. Maximum 100 characters allowed" })
            .optional()
    });

    req.body = await createUserZodSchema.parseAsync(req.body);
    next();
}, UserController.createUser)
router.get('/all-user', UserController.getAllUser)

export const UserRoutes = router;
