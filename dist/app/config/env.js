import dotenv from 'dotenv';
dotenv.config();
const loadEnvVariables = () => {
    const requiredEnvVars = ['PORT', 'DB_URL', 'NODE_ENV', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES_IN', 'BCRYPT_SALT', 'SUPER_ADMIN_EMAIL', 'SUPER_ADMIN_PASS', 'JWT_REFRESH_TOKEN', 'JWT_REFRESH_EXPIRES_IN'];
    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required env variable: ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
        JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
        BCRYPT_SALT: process.env.BCRYPT_SALT,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS
    };
};
export const envConfig = loadEnvVariables();
//# sourceMappingURL=env.js.map