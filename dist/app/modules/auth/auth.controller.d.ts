import type { NextFunction, Request, Response } from "express";
export declare const AuthController: {
    credentialLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getNewAccessToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map