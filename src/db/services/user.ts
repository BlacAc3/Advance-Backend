import "dotenv/config";
import { hashPassword } from "../../utils/password";
import { prisma } from "../database";
import { EnumUsersRole, Prisma } from "../../generated/prisma";

class UserService {
  async get(data: { id?: string; email?: string; walletAddress?: string }) {
    const { id, email, walletAddress } = data;

    if (id) {
      return await prisma.user.findUnique({
        where: { id },
      });
    } else if (email) {
      return await prisma.user.findUnique({
        where: { email },
      });
    } else if (walletAddress) {
      return await prisma.user.findUnique({
        where: { walletAddress },
      });
    } else {
      return null;
    }
  }

  async getAll() {
    return await prisma.user.findMany();
  }

  async create(data: {
    username?: string;
    email: string;
    password: string;
    role?: EnumUsersRole;
    walletAddress?: string | null;
  }) {
    const {
      password,
      role = EnumUsersRole.WEB3_USER,
      walletAddress,
      ...rest
    } = data;
    const hashedPassword = await hashPassword(password);

    const createData: Prisma.UserCreateInput = {
      ...rest, // This contains username (if provided) and email
      password: hashedPassword,
      role,
    };

    if (typeof walletAddress === "string" && walletAddress.trim() !== "") {
      createData.walletAddress = walletAddress;
    } else if (walletAddress === null) {
      createData.walletAddress = null;
    }
    return await prisma.user.create({
      data: createData,
    });
  }

  async update(
    id: string,
    data: Partial<{
      username: string;
      email: string;
      password: string;
      role: EnumUsersRole;
      walletAddress: string;
      isActive: boolean;
      isWalletVerified: boolean;
    }>,
  ) {
    const updateData = { ...data };

    // Hash password if it's being updated
    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

const userService = new UserService();

export default userService;
