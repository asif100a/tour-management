import { Router, type NextFunction, type Request, type Response } from "express";
import { AuthController } from "./auth.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "../user/user.interface.js";
import passport from "passport";

const router = Router()

router.post('/login', AuthController.credentialLogin)
router.post('/refresh-token', AuthController.getNewAccessToken)
router.post('/logout', AuthController.logout)
router.post('reset-password', checkAuth(...Object.values(Role)), AuthController.resetPassword)
router.post('google', async(req: Request, res: Response, next:NextFunction) => {
    const redirect = req.query.redirect || '/';
    passport.authenticate('google', {scope: ['profile', 'email'], state: redirect as string})(req, res, next)
})
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), AuthController.googleCallback)

export const AuthRoutes = router;