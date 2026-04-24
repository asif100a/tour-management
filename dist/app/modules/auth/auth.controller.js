import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatusCode from 'http-status-codes';
import { AuthServices } from "./auth.service.js";
import AppError from "../../errorHandlers/AppError.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async (req, res, next) => {
    const loginInfo = await AuthServices.credentialLogin(req.body);
    res.cookie('refreshToken', loginInfo.refreshToken, {
        httpOnly: true,
        secure: false
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'User logged in successfully',
        data: loginInfo
    });
});
const getNewAccessToken = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatusCode.StatusCodes.BAD_REQUEST, "No refresh token received from cookies");
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'User logged in successfully',
        data: tokenInfo
    });
});
export const AuthController = {
    credentialLogin,
    getNewAccessToken
};
//# sourceMappingURL=auth.controller.js.map