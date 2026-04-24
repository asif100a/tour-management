import httpStatusCode from 'http-status-codes';
import { UserServices } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
const createUser = catchAsync(async (req, res, next) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.CREATED,
        message: 'User created successfully',
        data: user
    });
});
const updateUser = catchAsync(async (req, res, next) => {
    const userId = req.params?.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envConfig.JWT_ACCESS_SECRET)
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.CREATED,
        message: 'User created successfully',
        data: user
    });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUser = catchAsync(async (req, res, next) => {
    const result = await UserServices.getAllUser();
    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.StatusCodes.OK,
        message: 'Users retrieved successfully',
        data: result.data,
        meta: result.meta
    });
});
export const UserController = {
    createUser,
    updateUser,
    getAllUser
};
//# sourceMappingURL=user.controller.js.map