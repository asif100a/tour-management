import { envConfig } from "../config/env.js";
import { generateToken } from "./jwt.js";
export const createUserTokens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = generateToken(jwtPayload, envConfig.JWT_ACCESS_SECRET, envConfig.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = generateToken(jwtPayload, envConfig.JWT_REFRESH_TOKEN, envConfig.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken
    };
};
//# sourceMappingURL=userModels.js.map