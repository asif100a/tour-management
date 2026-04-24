import type { JwtPayload } from "jsonwebtoken";
declare module "express-serve-static-core" {
    interface Request {
        user: JwtPayload;
    }
}
//# sourceMappingURL=index.d.ts.map