import dotenv from 'dotenv'

dotenv.config()

type NodeEnv = 'production' | 'development'

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: NodeEnv
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVars: string[] = ['PORT', 'DB_URL', 'NODE_ENV']

    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variable: ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as NodeEnv
    }
}

export const envConfig: EnvConfig = loadEnvVariables()