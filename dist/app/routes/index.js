import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
export const router = Router();
const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map