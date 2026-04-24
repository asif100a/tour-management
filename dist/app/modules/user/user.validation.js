import z from "zod";
import { IsActive, Role } from "./user.interface.js";
export const createUserZodSchema = z.object({
    name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "The name is too short, minimum 2 characters required" })
        .max(30, { message: "The name is too long, maximum 30 characters allowed" }),
    email: z
        .string({ error: "Email must be string" })
        .email({ message: 'Invalid email address' })
        .min(5, { message: 'Email must be at least 5 characters long' }),
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
    }),
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
export const updateUserZodSchema = z.object({
    name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "The name is too short, minimum 2 characters required" })
        .max(30, { message: "The name is too long, maximum 30 characters allowed" }).optional(),
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
    role: z.enum(Object.values(Role)).optional(),
    isActive: z.enum(Object.values(IsActive)).optional(),
    isDeleted: z.boolean({ error: 'isDeleted must be true or false' }).optional(),
    isVerified: z.boolean({ error: 'isVerified must be true or false' }).optional(),
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
//# sourceMappingURL=user.validation.js.map