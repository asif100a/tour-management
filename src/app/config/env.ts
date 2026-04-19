import dotenv from 'dotenv'

dotenv.config()

type NodeEnv = 'production' | 'development'

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: NodeEnv,
    JWT_ACCESS_SECRET: string
    JWT_ACCESS_EXPIRES_IN: string
    BCRYPT_SALT: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVars: string[] = ['PORT', 'DB_URL', 'NODE_ENV', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES_IN', 'BCRYPT_SALT']

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
        BCRYPT_SALT: process.env.BCRYPT_SALT as string
    }
}

export const envConfig: EnvConfig = loadEnvVariables()