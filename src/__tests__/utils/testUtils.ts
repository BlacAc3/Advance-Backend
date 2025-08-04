import { UserRole } from "../../types";
import jwt from "jsonwebtoken";
import userService from "../../db/services/user";
import { prisma } from "../../db/database";

export const generateRandomWalletAddress = (): string => {
  let randomHex = "";
  const characters = "0123456789abcdef";
  for (let i = 0; i < 40; i++) {
    randomHex += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return "0x" + randomHex;
};

export const createTestUser = async (
  email: string = "testuser@example.com",
  password: string,
  role: UserRole = UserRole.EMPLOYEE,
  isWalletVerified: boolean = false,
) => {
  const walletAddress = generateRandomWalletAddress();

  const user = await userService.create({
    email,
    password,
    role,
    walletAddress,
  });

  return user;
};

export const generateTestTokens = (user: any) => {
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
export const createTestEmployer = async (
  email: string,
  password: string,
  companyName: string,
  role: UserRole = UserRole.EMPLOYER,
) => {
  const user = await userService.create({
    email,
    password,
    role,
    walletAddress: generateRandomWalletAddress(),
    username: `testuser_${Date.now()}`,
  });

  const employerData = {
    userId: user.id,
    companyName: companyName,
    registrationDate: new Date(),
  };
  const newEmployer = await prisma.employer.create({
    data: employerData,
  });
  return newEmployer;
};

export const createTestMarketer = async (email: string, password: string) => {
  const user = await userService.create({
    email,
    password,
    role: UserRole.MARKETER,
    walletAddress: generateRandomWalletAddress(),
    username: `testuser_${Date.now()}`,
  });

  const marketer = await userService.get({ email });

  if (marketer) {
    const marketerData = {
      userId: marketer.id,
      registrationDate: new Date(),
    };
    const newMarketer = await prisma.marketer.create({
      data: marketerData,
    });
  }
  return marketer;
};
