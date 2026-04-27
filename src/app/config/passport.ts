import passport from "passport";
import { Strategy as GoogleStrategy, type Profile, type VerifyCallback } from "passport-google-oauth20";
import { envConfig } from "./env.js";
import { User } from "../modules/user/user.model.js";
import { Role } from "../modules/user/user.interface.js";

passport.use(
    new GoogleStrategy({
        clientID: envConfig.GOOGLE_CLIENT_ID,
        clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
        callbackURL: envConfig.GOOGLE_CALLBACK_URL
    }, async(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {
            const email  = profile.emails?.[0]?.value

            if(!email) {
                return done(null, false, {message: 'No email found!'})
            }

            let user = await User.findOne({email})

            if(!user) {
                user = await User.create({
                    email,
                    name: profile.displayName,
                    picture: profile?.photos?.[0]?.value,
                    role: Role.USER,
                    isVerified: true,
                    auths: [
                        {
                            provider: 'google',
                            providerId: profile.id
                        }
                    ]
                })
            }

            return done(null, user)
        } catch (error) {
            console.error(`Error from the Google Strategy: `, error);
            return done(error)
        }
    })
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async(id: string, done:any) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})