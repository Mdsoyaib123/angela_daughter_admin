import bcrypt from "bcrypt";
import { User } from "./user.model";

const createUser = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    const isUserExist = await User.findOne({ email: payload.email });

    if (isUserExist) {
        throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const user = await User.create({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
};

const getAllUsers = async () => {
    return User.find().select("-password");
};

const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const UserServices = {
    createUser,
    getAllUsers,
    getSingleUser,
};