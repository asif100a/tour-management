import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";

interface ModuleRoute {
    path: string,
    route: Router
}

export const router = Router()

const moduleRoutes: ModuleRoute[] = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})