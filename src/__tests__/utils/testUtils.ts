import { User } from "../../models/User";
import { UserRole } from "../../types";
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/password";

export const createTestUser = async (
  email: string = "testuser@example.com",
  password: string,
  role: UserRole = UserRole.EMPLOYEE,
  isWalletVerified: boolean = false,
) => {
  let randomHex = "";
  const characters = "0123456789abcdef";
  for (let i = 0; i < 40; i++) {
    randomHex += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  const walletAddress = "0x" + randomHex;
  randomHex;

  const user = await User.create({
    email,
    password,
    role,
    walletAddress,
    isActive: true,
    isWalletVerified: isWalletVerified,
  });

  return user;
};

export const generateTestTokens = (user: User) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
};
