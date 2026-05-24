import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { jwtHelpers } from "../../utils/JWT";

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }

  const tokenPayload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = jwtHelpers.generateToken(
    tokenPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN || "7d"
  );

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const AuthServices = {
  loginUser,
};