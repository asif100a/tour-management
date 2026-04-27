import dotenv from 'dotenv'

dotenv.config()

type NodeEnv = 'production' | 'development'

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: NodeEnv,

    JWT_ACCESS_SECRET: string
    JWT_ACCESS_EXPIRES_IN: string
    JWT_REFRESH_TOKEN: string
    JWT_REFRESH_EXPIRES_IN: string

    BCRYPT_SALT: string
    SUPER_ADMIN_EMAIL: string
    SUPER_ADMIN_PASS: string

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_CALLBACK_URL: string
    EXPRESS_SESSION_SECRET: string

    FRONTEND_URL: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVars: string[] = ['PORT', 'DB_URL', 'NODE_ENV', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES_IN', 'BCRYPT_SALT', 'SUPER_ADMIN_EMAIL', 'SUPER_ADMIN_PASS', 'JWT_REFRESH_TOKEN', 'JWT_REFRESH_EXPIRES_IN', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_CALLBACK_URL', 'EXPRESS_SESSION_SECRET', 'FRONTEND_URL']

    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variable: ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as NodeEnv,

        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN as string,
        JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN as string,
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
        
        BCRYPT_SALT: process.env.BCRYPT_SALT as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,

    }
}

export const envConfig: EnvConfig = loadEnvVariables()