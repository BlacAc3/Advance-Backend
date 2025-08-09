import { PrismaClient } from "../../../generated/prisma";
import { EnumUsersRole } from "../../../generated/prisma";
import userService from "../user";
import { hashPassword } from "../../../utils/password";
import bcrypt from "bcrypt";

// Mock the dependencies
jest.mock("../../database", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("../../../utils/password");

const { prisma } = require("../../database");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    const mockUser = {
      id: "test-user-id",
      email: "test@example.com",
      username: "testuser",
      walletAddress: "0x1234567890",
      role: EnumUsersRole.WEB3_USER,
      password: "hashedpassword",
      isActive: true,
      isWalletVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      marketer: null,
      employer: null,
      employee: null,
    };

    it("should get user by id", async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.get({ id: "test-user-id" });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: "test-user-id" },
        include: {
          marketer: true,
          employer: true,
          employee: true,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it("should get user by email", async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.get({ email: "test@example.com" });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
        include: {
          marketer: true,
          employer: true,
          employee: true,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it("should get user by walletAddress", async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.get({ walletAddress: "0x1234567890" });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { walletAddress: "0x1234567890" },
        include: {
          marketer: true,
          employer: true,
          employee: true,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null when no search criteria provided", async () => {
      const result = await userService.get({});

      expect(prisma.user.findUnique).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it("should return null when user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await userService.get({ id: "non-existent-id" });

      expect(result).toBeNull();
    });
  });

  describe("getAll", () => {
    it("should get all users", async () => {
      const mockUsers = [
        { id: "user1", email: "user1@example.com" },
        { id: "user2", email: "user2@example.com" },
      ];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(prisma.user.findMany).toHaveBeenCalledWith();
      expect(result).toEqual(mockUsers);
    });

    it("should return empty array when no users exist", async () => {
      prisma.user.findMany.mockResolvedValue([]);

      const result = await userService.getAll();

      expect(result).toEqual([]);
    });
  });

  describe("create", () => {
    const mockHashedPassword = "hashedPassword123";

    beforeEach(() => {
      (hashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);
    });

    it("should create a user with required fields", async () => {
      const userData = {
        email: "newuser@example.com",
        password: "password123",
      };

      const createdUser = {
        id: "new-user-id",
        email: userData.email,
        password: mockHashedPassword,
        role: EnumUsersRole.WEB3_USER,
        walletAddress: null,
        username: null,
      };

      prisma.user.create.mockResolvedValue(createdUser);

      const result = await userService.create(userData);

      expect(hashPassword).toHaveBeenCalledWith(userData.password);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: mockHashedPassword,
          role: EnumUsersRole.WEB3_USER,
        },
      });
      expect(result).toEqual(createdUser);
    });

    it("should create a user with all optional fields", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        role: EnumUsersRole.EMPLOYER,
        walletAddress: "0xabcdef123456",
      };

      const createdUser = {
        id: "new-user-id",
        ...userData,
        password: mockHashedPassword,
      };

      prisma.user.create.mockResolvedValue(createdUser);

      const result = await userService.create(userData);

      expect(hashPassword).toHaveBeenCalledWith(userData.password);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: userData.username,
          email: userData.email,
          password: mockHashedPassword,
          role: userData.role,
          walletAddress: userData.walletAddress,
        },
      });
      expect(result).toEqual(createdUser);
    });

    it("should handle empty wallet address string", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        walletAddress: "   ",
      };

      prisma.user.create.mockResolvedValue({
        id: "new-user-id",
        email: userData.email,
        password: mockHashedPassword,
        walletAddress: null,
      });

      await userService.create(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: mockHashedPassword,
          role: EnumUsersRole.WEB3_USER,
        },
      });
    });

    it("should handle null wallet address", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        walletAddress: null,
      };

      prisma.user.create.mockResolvedValue({
        id: "new-user-id",
        email: userData.email,
        password: mockHashedPassword,
        walletAddress: null,
      });

      await userService.create(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: mockHashedPassword,
          role: EnumUsersRole.WEB3_USER,
          walletAddress: null,
        },
      });
    });
  });

  describe("update", () => {
    const mockHashedPassword = "newHashedPassword";

    beforeEach(() => {
      (hashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);
    });

    it("should update user with all fields", async () => {
      const updateData = {
        username: "updateduser",
        email: "updated@example.com",
        password: "newpassword",
        role: EnumUsersRole.MARKETER,
        walletAddress: "0xnewaddress",
        isActive: false,
        isWalletVerified: true,
      };

      const updatedUser = {
        id: "user-id",
        ...updateData,
        password: mockHashedPassword,
      };

      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await userService.update("user-id", updateData);

      expect(hashPassword).toHaveBeenCalledWith(updateData.password);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "user-id" },
        data: {
          ...updateData,
          password: mockHashedPassword,
        },
      });
      expect(result).toEqual(updatedUser);
    });

    it("should update user without password", async () => {
      const updateData = {
        username: "updateduser",
        email: "updated@example.com",
      };

      const updatedUser = {
        id: "user-id",
        ...updateData,
      };

      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await userService.update("user-id", updateData);

      expect(hashPassword).not.toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "user-id" },
        data: updateData,
      });
      expect(result).toEqual(updatedUser);
    });

    it("should update only specific fields", async () => {
      const updateData = {
        isActive: false,
      };

      const updatedUser = {
        id: "user-id",
        email: "existing@example.com",
        isActive: false,
      };

      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await userService.update("user-id", updateData);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "user-id" },
        data: updateData,
      });
      expect(result).toEqual(updatedUser);
    });

    it("should handle empty update data", async () => {
      const updatedUser = {
        id: "user-id",
        email: "existing@example.com",
      };

      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await userService.update("user-id", {});

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: "user-id" },
        data: {},
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe("delete", () => {
    it("should delete a user", async () => {
      const deletedUser = {
        id: "user-id",
        email: "deleted@example.com",
      };

      prisma.user.delete.mockResolvedValue(deletedUser);

      const result = await userService.delete("user-id");

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: "user-id" },
      });
      expect(result).toEqual(deletedUser);
    });

    it("should throw error when user not found", async () => {
      const error = new Error("User not found");
      prisma.user.delete.mockRejectedValue(error);

      await expect(userService.delete("non-existent-id")).rejects.toThrow(
        "User not found",
      );
    });
  });

  describe("error handling", () => {
    it("should handle database connection errors", async () => {
      const dbError = new Error("Database connection failed");
      prisma.user.findUnique.mockRejectedValue(dbError);

      await expect(userService.get({ id: "test-id" })).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should handle validation errors in create", async () => {
      const validationError = new Error("Invalid email format");
      prisma.user.create.mockRejectedValue(validationError);

      await expect(
        userService.create({
          email: "invalid-email",
          password: "password123",
        }),
      ).rejects.toThrow("Invalid email format");
    });

    it("should handle unique constraint violations", async () => {
      const constraintError = new Error("Unique constraint violation");
      prisma.user.create.mockRejectedValue(constraintError);

      await expect(
        userService.create({
          email: "existing@example.com",
          password: "password123",
        }),
      ).rejects.toThrow("Unique constraint violation");
    });
  });
});
