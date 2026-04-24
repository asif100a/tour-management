type NodeEnv = 'production' | 'development';
interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: NodeEnv;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    BCRYPT_SALT: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASS: string;
}
export declare const envConfig: EnvConfig;
export {};
//# sourceMappingURL=env.d.ts.map