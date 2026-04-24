import { envConfig } from "../config/env.js";
import { Role } from "../modules/user/user.interface.js";
import { User } from "../modules/user/user.model.js";
import bcrypt from "bcryptjs";
export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envConfig.SUPER_ADMIN_EMAIL });
        if (isSuperAdminExist) {
            console.log('Super Admin already exists'.cyan.bold);
            return;
        }
        const hashedPassword = await bcrypt.hash(envConfig.SUPER_ADMIN_PASS, Number(envConfig.BCRYPT_SALT));
        const authProvider = {
            provider: 'credentials',
            providerId: envConfig.SUPER_ADMIN_EMAIL
        };
        const payload = {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email: envConfig.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            auths: [authProvider],
            isVerified: true
        };
        const superAdmin = await User.create(payload);
        console.log("✅ Super Admin created successfully: ", superAdmin);
    }
    catch (error) {
        console.error('❌ Failed to check the super admin: ', error);
    }
};
//# sourceMappingURL=seedSuperAdmin.js.map