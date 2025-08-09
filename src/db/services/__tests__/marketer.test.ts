import { PrismaClient } from "../../../generated/prisma";
import marketerService from "../marketer";

// Mock the dependencies
jest.mock("../../database", () => ({
  prisma: {
    marketer: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const { prisma } = require("../../database");

describe("MarketerService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    const mockMarketer = {
      id: 1,
      userId: "user-id",
      registrationDate: new Date("2024-01-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: "user-id",
        email: "marketer@example.com",
        username: "marketer1",
      },
    };

    it("should get marketer by id", async () => {
      prisma.marketer.findUnique.mockResolvedValue(mockMarketer);

      const result = await marketerService.get({ id: 1 });

      expect(prisma.marketer.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          user: true,
        },
      });
      expect(result).toEqual(mockMarketer);
    });

    it("should get marketer by userId", async () => {
      prisma.marketer.findUnique.mockResolvedValue(mockMarketer);

      const result = await marketerService.get({ userId: "user-id" });

      expect(prisma.marketer.findUnique).toHaveBeenCalledWith({
        where: { userId: "user-id" },
        include: {
          user: true,
        },
      });
      expect(result).toEqual(mockMarketer);
    });

    it("should prioritize id over userId when both provided", async () => {
      prisma.marketer.findUnique.mockResolvedValue(mockMarketer);

      const result = await marketerService.get({
        id: 1,
        userId: "user-id",
      });

      expect(prisma.marketer.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          user: true,
        },
      });
      expect(result).toEqual(mockMarketer);
    });

    it("should throw error when neither id nor userId provided", async () => {
      await expect(marketerService.get({})).rejects.toThrow(
        "Either id or userId must be provided",
      );

      expect(prisma.marketer.findUnique).not.toHaveBeenCalled();
    });

    it("should return null when marketer not found by id", async () => {
      prisma.marketer.findUnique.mockResolvedValue(null);

      const result = await marketerService.get({ id: 999 });

      expect(result).toBeNull();
    });

    it("should return null when marketer not found by userId", async () => {
      prisma.marketer.findUnique.mockResolvedValue(null);

      const result = await marketerService.get({ userId: "non-existent-user" });

      expect(result).toBeNull();
    });

    it("should handle negative id values", async () => {
      prisma.marketer.findUnique.mockResolvedValue(null);

      const result = await marketerService.get({ id: -1 });

      expect(prisma.marketer.findUnique).toHaveBeenCalledWith({
        where: { id: -1 },
        include: {
          user: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create marketer with required fields", async () => {
      const marketerData = {
        userId: "new-user-id",
        registrationDate: new Date("2024-01-15"),
      };

      const createdMarketer = {
        id: 1,
        ...marketerData,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: "new-user-id",
          email: "newmarketer@example.com",
        },
      };

      prisma.marketer.create.mockResolvedValue(createdMarketer);

      const result = await marketerService.create(marketerData);

      expect(prisma.marketer.create).toHaveBeenCalledWith({
        data: marketerData,
        include: {
          user: true,
        },
      });
      expect(result).toEqual(createdMarketer);
    });

    it("should handle unique constraint violation", async () => {
      const marketerData = {
        userId: "existing-user-id",
        registrationDate: new Date(),
      };

      const error = new Error("Unique constraint violation");
      prisma.marketer.create.mockRejectedValue(error);

      await expect(marketerService.create(marketerData)).rejects.toThrow(
        "Unique constraint violation",
      );
    });

    it("should handle foreign key constraint violation", async () => {
      const marketerData = {
        userId: "non-existent-user",
        registrationDate: new Date(),
      };

      const error = new Error("Foreign key constraint violation");
      prisma.marketer.create.mockRejectedValue(error);

      await expect(marketerService.create(marketerData)).rejects.toThrow(
        "Foreign key constraint violation",
      );
    });

    it("should handle invalid date", async () => {
      const marketerData = {
        userId: "user-id",
        registrationDate: new Date("invalid-date"),
      };

      const error = new Error("Invalid date format");
      prisma.marketer.create.mockRejectedValue(error);

      await expect(marketerService.create(marketerData)).rejects.toThrow(
        "Invalid date format",
      );
    });
  });

  describe("update", () => {
    it("should update marketer registration date", async () => {
      const updateData = {
        registrationDate: new Date("2024-02-01"),
      };

      const updatedMarketer = {
        id: 1,
        userId: "user-id",
        ...updateData,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        user: {
          id: "user-id",
          email: "marketer@example.com",
        },
      };

      prisma.marketer.update.mockResolvedValue(updatedMarketer);

      const result = await marketerService.update(1, updateData);

      expect(prisma.marketer.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        include: {
          user: true,
        },
      });
      expect(result).toEqual(updatedMarketer);
    });

    it("should handle empty update data", async () => {
      const updatedMarketer = {
        id: 1,
        userId: "user-id",
        registrationDate: new Date("2024-01-01"),
        user: {
          id: "user-id",
          email: "marketer@example.com",
        },
      };

      prisma.marketer.update.mockResolvedValue(updatedMarketer);

      const result = await marketerService.update(1, {});

      expect(prisma.marketer.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {},
        include: {
          user: true,
        },
      });
      expect(result).toEqual(updatedMarketer);
    });

    it("should throw error when marketer not found", async () => {
      const error = new Error("Marketer not found");
      prisma.marketer.update.mockRejectedValue(error);

      await expect(
        marketerService.update(999, { registrationDate: new Date() }),
      ).rejects.toThrow("Marketer not found");
    });

    it("should handle invalid date in update", async () => {
      const error = new Error("Invalid date format");
      prisma.marketer.update.mockRejectedValue(error);

      await expect(
        marketerService.update(1, { registrationDate: new Date("invalid") }),
      ).rejects.toThrow("Invalid date format");
    });

    it("should handle negative id in update", async () => {
      const error = new Error("Invalid id");
      prisma.marketer.update.mockRejectedValue(error);

      await expect(
        marketerService.update(-1, { registrationDate: new Date() }),
      ).rejects.toThrow("Invalid id");
    });
  });

  describe("delete", () => {
    it("should delete a marketer", async () => {
      const deletedMarketer = {
        id: 1,
        userId: "user-id",
        registrationDate: new Date("2024-01-01"),
      };

      prisma.marketer.delete.mockResolvedValue(deletedMarketer);

      const result = await marketerService.delete(1);

      expect(prisma.marketer.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(deletedMarketer);
    });

    it("should throw error when marketer not found", async () => {
      const error = new Error("Marketer not found");
      prisma.marketer.delete.mockRejectedValue(error);

      await expect(marketerService.delete(999)).rejects.toThrow(
        "Marketer not found",
      );
    });

    it("should handle foreign key constraint on delete", async () => {
      const error = new Error("Foreign key constraint violation");
      prisma.marketer.delete.mockRejectedValue(error);

      await expect(marketerService.delete(1)).rejects.toThrow(
        "Foreign key constraint violation",
      );
    });

    it("should handle negative id in delete", async () => {
      const error = new Error("Invalid id");
      prisma.marketer.delete.mockRejectedValue(error);

      await expect(marketerService.delete(-1)).rejects.toThrow("Invalid id");
    });
  });

  describe("getAll", () => {
    it("should get all marketers", async () => {
      const mockMarketers = [
        {
          id: 1,
          userId: "user-1",
          registrationDate: new Date("2024-01-01"),
          user: {
            id: "user-1",
            email: "marketer1@example.com",
          },
        },
        {
          id: 2,
          userId: "user-2",
          registrationDate: new Date("2024-01-02"),
          user: {
            id: "user-2",
            email: "marketer2@example.com",
          },
        },
        {
          id: 3,
          userId: "user-3",
          registrationDate: new Date("2024-01-03"),
          user: {
            id: "user-3",
            email: "marketer3@example.com",
          },
        },
      ];

      prisma.marketer.findMany.mockResolvedValue(mockMarketers);

      const result = await marketerService.getAll();

      expect(prisma.marketer.findMany).toHaveBeenCalledWith({
        include: {
          user: true,
        },
      });
      expect(result).toEqual(mockMarketers);
      expect(result).toHaveLength(3);
    });

    it("should return empty array when no marketers exist", async () => {
      prisma.marketer.findMany.mockResolvedValue([]);

      const result = await marketerService.getAll();

      expect(prisma.marketer.findMany).toHaveBeenCalledWith({
        include: {
          user: true,
        },
      });
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should handle database errors in getAll", async () => {
      const error = new Error("Database connection failed");
      prisma.marketer.findMany.mockRejectedValue(error);

      await expect(marketerService.getAll()).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should return marketers with null user relationships", async () => {
      const mockMarketers = [
        {
          id: 1,
          userId: "user-1",
          registrationDate: new Date("2024-01-01"),
          user: null,
        },
      ];

      prisma.marketer.findMany.mockResolvedValue(mockMarketers);

      const result = await marketerService.getAll();

      expect(result).toEqual(mockMarketers);
    });
  });

  describe("error handling", () => {
    it("should handle database connection errors in get", async () => {
      const dbError = new Error("Database connection failed");
      prisma.marketer.findUnique.mockRejectedValue(dbError);

      await expect(marketerService.get({ id: 1 })).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should handle validation errors in create", async () => {
      const validationError = new Error("Invalid data format");
      prisma.marketer.create.mockRejectedValue(validationError);

      await expect(
        marketerService.create({
          userId: "",
          registrationDate: new Date(),
        }),
      ).rejects.toThrow("Invalid data format");
    });

    it("should handle transaction errors in update", async () => {
      const transactionError = new Error("Transaction failed");
      prisma.marketer.update.mockRejectedValue(transactionError);

      await expect(
        marketerService.update(1, { registrationDate: new Date() }),
      ).rejects.toThrow("Transaction failed");
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new Error("Query timeout");
      prisma.marketer.findMany.mockRejectedValue(timeoutError);

      await expect(marketerService.getAll()).rejects.toThrow("Query timeout");
    });

    it("should handle permission errors", async () => {
      const permissionError = new Error("Permission denied");
      prisma.marketer.delete.mockRejectedValue(permissionError);

      await expect(marketerService.delete(1)).rejects.toThrow(
        "Permission denied",
      );
    });

    it("should handle concurrent modification errors", async () => {
      const concurrentError = new Error("Concurrent modification detected");
      prisma.marketer.update.mockRejectedValue(concurrentError);

      await expect(
        marketerService.update(1, { registrationDate: new Date() }),
      ).rejects.toThrow("Concurrent modification detected");
    });
  });

  describe("edge cases", () => {
    it("should handle very large id values", async () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      prisma.marketer.findUnique.mockResolvedValue(null);

      const result = await marketerService.get({ id: largeId });

      expect(prisma.marketer.findUnique).toHaveBeenCalledWith({
        where: { id: largeId },
        include: {
          user: true,
        },
      });
      expect(result).toBeNull();
    });

    it("should handle special characters in userId", async () => {
      const specialUserId = "user-id-with-special-chars-!@#$%";
      prisma.marketer.findUnique.mockResolvedValue(null);

      const result = await marketerService.get({ userId: specialUserId });

      expect(prisma.marketer.findUnique).toHaveBeenCalledWith({
        where: { userId: specialUserId },
        include: {
          user: true,
        },
      });
      expect(result).toBeNull();
    });

    it("should handle future dates in registration", async () => {
      const futureDate = new Date("2099-12-31");
      const marketerData = {
        userId: "user-id",
        registrationDate: futureDate,
      };

      const createdMarketer = {
        id: 1,
        ...marketerData,
        user: {
          id: "user-id",
          email: "future@example.com",
        },
      };

      prisma.marketer.create.mockResolvedValue(createdMarketer);

      const result = await marketerService.create(marketerData);

      expect(result.registrationDate).toEqual(futureDate);
    });

    it("should handle past dates in registration", async () => {
      const pastDate = new Date("1900-01-01");
      const marketerData = {
        userId: "user-id",
        registrationDate: pastDate,
      };

      const createdMarketer = {
        id: 1,
        ...marketerData,
        user: {
          id: "user-id",
          email: "past@example.com",
        },
      };

      prisma.marketer.create.mockResolvedValue(createdMarketer);

      const result = await marketerService.create(marketerData);

      expect(result.registrationDate).toEqual(pastDate);
    });
  });
});
