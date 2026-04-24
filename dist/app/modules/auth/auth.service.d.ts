import { type IUser } from "../user/user.interface.js";
export declare const AuthServices: {
    credentialLogin: (payload: Partial<IUser>) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map