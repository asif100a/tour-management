import { type IUser } from "./user.interface.js";
import type { JwtPayload } from "jsonwebtoken";
export declare const UserServices: {
    createUser: (payload: Pick<IUser, "name" | "email" | "password" | "phone" | "address">) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllUser: () => Promise<{
        data: (import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            total: number;
        };
    }>;
    updateUser: (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=user.service.d.ts.map