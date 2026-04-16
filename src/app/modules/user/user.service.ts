import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUser = async (payload: Pick<IUser, 'name' | 'email'>) => {
    const { name, email } = payload;

    const user = await User.create({ name, email })

    return user;
}

export const UserServices = {
    createUser
}