import { PrismaClient } from "../../../generated/prisma";
import employerService from "../employer";

// Mock the dependencies
jest.mock("../../database", () => ({
  prisma: {
    employer: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const { prisma } = require("../../database");

describe("EmployerService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    const mockEmployer = {
      id: "employer-id",
      userId: "user-id",
      marketerId: 1,
      companyName: "Test Company",
      registrationDate: new Date("2024-01-01"),
      isVerified: true,
      verificationDate: new Date("2024-01-02"),
      verifiedBy: "verifier-id",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: "user-id",
        email: "employer@example.com",
      },
      marketer: {
        id: 1,
        userId: "marketer-user-id",
      },
      verifiedByUser: {
        id: "verifier-id",
        email: "verifier@example.com",
      },
      employees: [],
    };

    it("should get employer by id", async () => {
      prisma.employer.findUnique.mockResolvedValue(mockEmployer);

      const result = await employerService.get({ id: "employer-id" });

      expect(prisma.employer.findUnique).toHaveBeenCalledWith({
        where: { id: "employer-id" },
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
          employees: true,
        },
      });
      expect(result).toEqual(mockEmployer);
    });

    it("should get employer by companyName", async () => {
      prisma.employer.findUnique.mockResolvedValue(mockEmployer);

      const result = await employerService.get({ companyName: "Test Company" });

      expect(prisma.employer.findUnique).toHaveBeenCalledWith({
        where: { companyName: "Test Company" },
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
          employees: true,
        },
      });
      expect(result).toEqual(mockEmployer);
    });

    it("should prioritize id over companyName when both provided", async () => {
      prisma.employer.findUnique.mockResolvedValue(mockEmployer);

      const result = await employerService.get({
        id: "employer-id",
        companyName: "Test Company",
      });

      expect(prisma.employer.findUnique).toHaveBeenCalledWith({
        where: { id: "employer-id" },
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
          employees: true,
        },
      });
      expect(result).toEqual(mockEmployer);
    });

    it("should throw error when neither id nor companyName provided", async () => {
      await expect(employerService.get({})).rejects.toThrow(
        "Either id or companyName must be provided",
      );

      expect(prisma.employer.findUnique).not.toHaveBeenCalled();
    });

    it("should return undefined when employer not found by id", async () => {
      prisma.employer.findUnique.mockResolvedValue(null);

      const result = await employerService.get({ id: "non-existent-id" });

      expect(result).toBeNull();
    });

    it("should return undefined when employer not found by companyName", async () => {
      prisma.employer.findUnique.mockResolvedValue(null);

      const result = await employerService.get({
        companyName: "Non Existent Company",
      });

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create employer with required fields", async () => {
      const employerData = {
        userId: "user-id",
        companyName: "New Company",
        registrationDate: new Date("2024-01-01"),
      };

      const createdEmployer = {
        id: "new-employer-id",
        ...employerData,
        marketerId: null,
        isVerified: false,
        verificationDate: null,
        verifiedBy: null,
        user: { id: "user-id", email: "user@example.com" },
        marketer: null,
        verifiedByUser: null,
      };

      prisma.employer.create.mockResolvedValue(createdEmployer);

      const result = await employerService.create(employerData);

      expect(prisma.employer.create).toHaveBeenCalledWith({
        data: employerData,
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
      expect(result).toEqual(createdEmployer);
    });

    it("should create employer with all optional fields", async () => {
      const employerData = {
        userId: "user-id",
        marketerId: 1,
        companyName: "New Company",
        registrationDate: new Date("2024-01-01"),
        isVerified: true,
        verificationDate: new Date("2024-01-02"),
        verifiedBy: "verifier-id",
      };

      const createdEmployer = {
        id: "new-employer-id",
        ...employerData,
        user: { id: "user-id", email: "user@example.com" },
        marketer: { id: 1, userId: "marketer-id" },
        verifiedByUser: { id: "verifier-id", email: "verifier@example.com" },
      };

      prisma.employer.create.mockResolvedValue(createdEmployer);

      const result = await employerService.create(employerData);

      expect(prisma.employer.create).toHaveBeenCalledWith({
        data: employerData,
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
      expect(result).toEqual(createdEmployer);
    });

    it("should handle unique constraint violation for companyName", async () => {
      const employerData = {
        userId: "user-id",
        companyName: "Existing Company",
        registrationDate: new Date(),
      };

      const error = new Error("Unique constraint violation");
      prisma.employer.create.mockRejectedValue(error);

      await expect(employerService.create(employerData)).rejects.toThrow(
        "Unique constraint violation",
      );
    });
  });

  describe("update", () => {
    it("should update employer with all fields", async () => {
      const updateData = {
        marketerId: 2,
        companyName: "Updated Company",
        isVerified: true,
        verificationDate: new Date("2024-01-15"),
        verifiedBy: "new-verifier-id",
      };

      const updatedEmployer = {
        id: "employer-id",
        userId: "user-id",
        ...updateData,
        user: { id: "user-id", email: "user@example.com" },
        marketer: { id: 2, userId: "marketer-2-id" },
        verifiedByUser: {
          id: "new-verifier-id",
          email: "newverifier@example.com",
        },
      };

      prisma.employer.update.mockResolvedValue(updatedEmployer);

      const result = await employerService.update("employer-id", updateData);

      expect(prisma.employer.update).toHaveBeenCalledWith({
        where: { id: "employer-id" },
        data: updateData,
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
      expect(result).toEqual(updatedEmployer);
    });

    it("should update employer with partial fields", async () => {
      const updateData = {
        isVerified: true,
        verificationDate: new Date("2024-01-10"),
      };

      const updatedEmployer = {
        id: "employer-id",
        userId: "user-id",
        companyName: "Test Company",
        ...updateData,
        user: { id: "user-id", email: "user@example.com" },
        marketer: null,
        verifiedByUser: null,
      };

      prisma.employer.update.mockResolvedValue(updatedEmployer);

      const result = await employerService.update("employer-id", updateData);

      expect(prisma.employer.update).toHaveBeenCalledWith({
        where: { id: "employer-id" },
        data: updateData,
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
      expect(result).toEqual(updatedEmployer);
    });

    it("should handle empty update data", async () => {
      const updatedEmployer = {
        id: "employer-id",
        userId: "user-id",
        companyName: "Test Company",
        user: { id: "user-id", email: "user@example.com" },
        marketer: null,
        verifiedByUser: null,
      };

      prisma.employer.update.mockResolvedValue(updatedEmployer);

      const result = await employerService.update("employer-id", {});

      expect(prisma.employer.update).toHaveBeenCalledWith({
        where: { id: "employer-id" },
        data: {},
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
      expect(result).toEqual(updatedEmployer);
    });

    it("should throw error when employer not found", async () => {
      const error = new Error("Employer not found");
      prisma.employer.update.mockRejectedValue(error);

      await expect(
        employerService.update("non-existent-id", { companyName: "New Name" }),
      ).rejects.toThrow("Employer not found");
    });
  });

  describe("delete", () => {
    it("should delete an employer", async () => {
      const deletedEmployer = {
        id: "employer-id",
        userId: "user-id",
        companyName: "Deleted Company",
      };

      prisma.employer.delete.mockResolvedValue(deletedEmployer);

      const result = await employerService.delete("employer-id");

      expect(prisma.employer.delete).toHaveBeenCalledWith({
        where: { id: "employer-id" },
      });
      expect(result).toEqual(deletedEmployer);
    });

    it("should throw error when employer not found", async () => {
      const error = new Error("Employer not found");
      prisma.employer.delete.mockRejectedValue(error);

      await expect(employerService.delete("non-existent-id")).rejects.toThrow(
        "Employer not found",
      );
    });

    it("should handle foreign key constraint errors", async () => {
      const error = new Error("Foreign key constraint violation");
      prisma.employer.delete.mockRejectedValue(error);

      await expect(employerService.delete("employer-id")).rejects.toThrow(
        "Foreign key constraint violation",
      );
    });
  });

  describe("getAll", () => {
    it("should get all employers", async () => {
      const mockEmployers = [
        {
          id: "employer-1",
          userId: "user-1",
          companyName: "Company 1",
          user: { id: "user-1", email: "user1@example.com" },
          marketer: null,
          verifiedByUser: null,
        },
        {
          id: "employer-2",
          userId: "user-2",
          companyName: "Company 2",
          user: { id: "user-2", email: "user2@example.com" },
          marketer: { id: 1, userId: "marketer-id" },
          verifiedByUser: { id: "verifier-id", email: "verifier@example.com" },
        },
      ];

      prisma.employer.findMany.mockResolvedValue(mockEmployers);

      const result = await employerService.getAll();

      expect(prisma.employer.findMany).toHaveBeenCalledWith({
        include: {
          user: true,
          marketer: true,
          verifiedByUser: true,
        },
      });
      expect(result).toEqual(mockEmployers);
    });

    it("should return empty array when no employers exist", async () => {
      prisma.employer.findMany.mockResolvedValue([]);

      const result = await employerService.getAll();

      expect(result).toEqual([]);
    });

    it("should handle database errors", async () => {
      const error = new Error("Database connection failed");
      prisma.employer.findMany.mockRejectedValue(error);

      await expect(employerService.getAll()).rejects.toThrow(
        "Database connection failed",
      );
    });
  });

  describe("error handling", () => {
    it("should handle database connection errors in get", async () => {
      const dbError = new Error("Database connection failed");
      prisma.employer.findUnique.mockRejectedValue(dbError);

      await expect(employerService.get({ id: "test-id" })).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should handle validation errors in create", async () => {
      const validationError = new Error("Invalid data format");
      prisma.employer.create.mockRejectedValue(validationError);

      await expect(
        employerService.create({
          userId: "invalid-user",
          companyName: "",
          registrationDate: new Date(),
        }),
      ).rejects.toThrow("Invalid data format");
    });

    it("should handle transaction errors", async () => {
      const transactionError = new Error("Transaction failed");
      prisma.employer.update.mockRejectedValue(transactionError);

      await expect(
        employerService.update("employer-id", { isVerified: true }),
      ).rejects.toThrow("Transaction failed");
    });
  });
});
