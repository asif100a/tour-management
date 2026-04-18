import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUser = async (payload: Pick<IUser, 'name' | 'email'>) => {
    const { name, email } = payload;

    const user = await User.create({ name, email })

    return user;
}

const getAllUser = async() => {
    const users = await User.find({})

    const totalUsers = await User.countDocuments()

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
}

export const UserServices = {
    createUser,
    getAllUser
}