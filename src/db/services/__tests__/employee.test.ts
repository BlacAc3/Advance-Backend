import { PrismaClient } from "../../../generated/prisma";
import {
  EnumEmployeesKycStage,
  EnumEmployeesKycStatus,
} from "../../../generated/prisma";
import employeeService from "../employee";

// Mock the dependencies
jest.mock("../../database", () => ({
  prisma: {
    employee: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const { prisma } = require("../../database");

describe("EmployeeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    const mockEmployee = {
      id: "employee-id",
      userId: "user-id",
      employerId: "employer-id",
      kycStage: EnumEmployeesKycStage.level_1,
      kycStatus: EnumEmployeesKycStatus.pending,
      kycSubmittedAt: new Date("2024-01-01"),
      kycReviewedAt: new Date("2024-01-02"),
      kycReviewerId: "reviewer-id",
      kycNotes: "Approved",
      salary: 50000,
      registrationDate: new Date("2024-01-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: "user-id",
        email: "employee@example.com",
      },
      employer: {
        id: "employer-id",
        companyName: "Test Company",
      },
      kycReviewer: {
        id: "reviewer-id",
        email: "reviewer@example.com",
      },
    };

    it("should get employee by id", async () => {
      prisma.employee.findUnique.mockResolvedValue(mockEmployee);

      const result = await employeeService.get({ id: "employee-id" });

      expect(prisma.employee.findUnique).toHaveBeenCalledWith({
        where: { id: "employee-id" },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(mockEmployee);
    });

    it("should get employee by userId", async () => {
      prisma.employee.findUnique.mockResolvedValue(mockEmployee);

      const result = await employeeService.get({ userId: "user-id" });

      expect(prisma.employee.findUnique).toHaveBeenCalledWith({
        where: { userId: "user-id" },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(mockEmployee);
    });

    it("should prioritize id over userId when both provided", async () => {
      prisma.employee.findUnique.mockResolvedValue(mockEmployee);

      const result = await employeeService.get({
        id: "employee-id",
        userId: "user-id",
      });

      expect(prisma.employee.findUnique).toHaveBeenCalledWith({
        where: { id: "employee-id" },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(mockEmployee);
    });

    it("should throw error when neither id nor userId provided", async () => {
      await expect(employeeService.get({})).rejects.toThrow(
        "Either id or userId must be provided",
      );

      expect(prisma.employee.findUnique).not.toHaveBeenCalled();
    });

    it("should return null when employee not found by id", async () => {
      prisma.employee.findUnique.mockResolvedValue(null);

      const result = await employeeService.get({ id: "non-existent-id" });

      expect(result).toBeNull();
    });

    it("should return null when employee not found by userId", async () => {
      prisma.employee.findUnique.mockResolvedValue(null);

      const result = await employeeService.get({
        userId: "non-existent-user-id",
      });

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create employee with required fields", async () => {
      const employeeData = {
        userId: "user-id",
        employerId: "employer-id",
        registrationDate: new Date("2024-01-01"),
      };

      const createdEmployee = {
        id: "new-employee-id",
        ...employeeData,
        kycStage: null,
        kycStatus: null,
        kycSubmittedAt: null,
        kycReviewedAt: null,
        kycReviewerId: null,
        kycNotes: null,
        salary: null,
        user: { id: "user-id", email: "user@example.com" },
        employer: { id: "employer-id", companyName: "Test Company" },
        kycReviewer: null,
      };

      prisma.employee.create.mockResolvedValue(createdEmployee);

      const result = await employeeService.create(employeeData);

      expect(prisma.employee.create).toHaveBeenCalledWith({
        data: employeeData,
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(createdEmployee);
    });

    it("should create employee with all optional fields", async () => {
      const employeeData = {
        userId: "user-id",
        employerId: "employer-id",
        kycStage: EnumEmployeesKycStage.level_3,
        kycStatus: EnumEmployeesKycStatus.approved,
        kycSubmittedAt: new Date("2024-01-01"),
        kycReviewedAt: new Date("2024-01-02"),
        kycReviewerId: "reviewer-id",
        kycNotes: "All documents verified",
        salary: 75000,
        registrationDate: new Date("2024-01-01"),
      };

      const createdEmployee = {
        id: "new-employee-id",
        ...employeeData,
        user: { id: "user-id", email: "user@example.com" },
        employer: { id: "employer-id", companyName: "Test Company" },
        kycReviewer: { id: "reviewer-id", email: "reviewer@example.com" },
      };

      prisma.employee.create.mockResolvedValue(createdEmployee);

      const result = await employeeService.create(employeeData);

      expect(prisma.employee.create).toHaveBeenCalledWith({
        data: employeeData,
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(createdEmployee);
    });

    it("should handle unique constraint violation", async () => {
      const employeeData = {
        userId: "existing-user-id",
        employerId: "employer-id",
        registrationDate: new Date(),
      };

      const error = new Error("Unique constraint violation");
      prisma.employee.create.mockRejectedValue(error);

      await expect(employeeService.create(employeeData)).rejects.toThrow(
        "Unique constraint violation",
      );
    });

    it("should handle foreign key constraint errors", async () => {
      const employeeData = {
        userId: "non-existent-user",
        employerId: "employer-id",
        registrationDate: new Date(),
      };

      const error = new Error("Foreign key constraint violation");
      prisma.employee.create.mockRejectedValue(error);

      await expect(employeeService.create(employeeData)).rejects.toThrow(
        "Foreign key constraint violation",
      );
    });
  });

  describe("update", () => {
    it("should update employee with all fields", async () => {
      const updateData = {
        kycStage: EnumEmployeesKycStage.level_3,
        kycStatus: EnumEmployeesKycStatus.approved,
        kycSubmittedAt: new Date("2024-01-10"),
        kycReviewedAt: new Date("2024-01-11"),
        kycReviewerId: "new-reviewer-id",
        kycNotes: "Updated verification",
        salary: 80000,
      };

      const updatedEmployee = {
        id: "employee-id",
        userId: "user-id",
        employerId: "employer-id",
        ...updateData,
        user: { id: "user-id", email: "user@example.com" },
        employer: { id: "employer-id", companyName: "Test Company" },
        kycReviewer: {
          id: "new-reviewer-id",
          email: "newreviewer@example.com",
        },
      };

      prisma.employee.update.mockResolvedValue(updatedEmployee);

      const result = await employeeService.update("employee-id", updateData);

      expect(prisma.employee.update).toHaveBeenCalledWith({
        where: { id: "employee-id" },
        data: updateData,
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(updatedEmployee);
    });

    it("should update employee with partial fields", async () => {
      const updateData = {
        kycStatus: EnumEmployeesKycStatus.approved,
        salary: 60000,
      };

      const updatedEmployee = {
        id: "employee-id",
        userId: "user-id",
        employerId: "employer-id",
        ...updateData,
        user: { id: "user-id", email: "user@example.com" },
        employer: { id: "employer-id", companyName: "Test Company" },
        kycReviewer: null,
      };

      prisma.employee.update.mockResolvedValue(updatedEmployee);

      const result = await employeeService.update("employee-id", updateData);

      expect(prisma.employee.update).toHaveBeenCalledWith({
        where: { id: "employee-id" },
        data: updateData,
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(updatedEmployee);
    });

    it("should handle empty update data", async () => {
      const updatedEmployee = {
        id: "employee-id",
        userId: "user-id",
        employerId: "employer-id",
        user: { id: "user-id", email: "user@example.com" },
        employer: { id: "employer-id", companyName: "Test Company" },
        kycReviewer: null,
      };

      prisma.employee.update.mockResolvedValue(updatedEmployee);

      const result = await employeeService.update("employee-id", {});

      expect(prisma.employee.update).toHaveBeenCalledWith({
        where: { id: "employee-id" },
        data: {},
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(updatedEmployee);
    });

    it("should throw error when employee not found", async () => {
      const error = new Error("Employee not found");
      prisma.employee.update.mockRejectedValue(error);

      await expect(
        employeeService.update("non-existent-id", { salary: 70000 }),
      ).rejects.toThrow("Employee not found");
    });

    it("should handle invalid enum values", async () => {
      const error = new Error("Invalid enum value");
      prisma.employee.update.mockRejectedValue(error);

      await expect(
        employeeService.update("employee-id", {
          kycStatus: "INVALID_STATUS" as any,
        }),
      ).rejects.toThrow("Invalid enum value");
    });
  });

  describe("delete", () => {
    it("should delete an employee", async () => {
      const deletedEmployee = {
        id: "employee-id",
        userId: "user-id",
        employerId: "employer-id",
      };

      prisma.employee.delete.mockResolvedValue(deletedEmployee);

      const result = await employeeService.delete("employee-id");

      expect(prisma.employee.delete).toHaveBeenCalledWith({
        where: { id: "employee-id" },
      });
      expect(result).toEqual(deletedEmployee);
    });

    it("should throw error when employee not found", async () => {
      const error = new Error("Employee not found");
      prisma.employee.delete.mockRejectedValue(error);

      await expect(employeeService.delete("non-existent-id")).rejects.toThrow(
        "Employee not found",
      );
    });

    it("should handle foreign key constraint errors", async () => {
      const error = new Error("Foreign key constraint violation");
      prisma.employee.delete.mockRejectedValue(error);

      await expect(employeeService.delete("employee-id")).rejects.toThrow(
        "Foreign key constraint violation",
      );
    });
  });

  describe("getAll", () => {
    it("should get all employees", async () => {
      const mockEmployees = [
        {
          id: "employee-1",
          userId: "user-1",
          employerId: "employer-1",
          salary: 50000,
          user: { id: "user-1", email: "user1@example.com" },
          employer: { id: "employer-1", companyName: "Company 1" },
          kycReviewer: null,
        },
        {
          id: "employee-2",
          userId: "user-2",
          employerId: "employer-2",
          salary: 60000,
          user: { id: "user-2", email: "user2@example.com" },
          employer: { id: "employer-2", companyName: "Company 2" },
          kycReviewer: { id: "reviewer-id", email: "reviewer@example.com" },
        },
      ];

      prisma.employee.findMany.mockResolvedValue(mockEmployees);

      const result = await employeeService.getAll();

      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(mockEmployees);
    });

    it("should return empty array when no employees exist", async () => {
      prisma.employee.findMany.mockResolvedValue([]);

      const result = await employeeService.getAll();

      expect(result).toEqual([]);
    });

    it("should handle database errors", async () => {
      const error = new Error("Database connection failed");
      prisma.employee.findMany.mockRejectedValue(error);

      await expect(employeeService.getAll()).rejects.toThrow(
        "Database connection failed",
      );
    });
  });

  describe("getByEmployerId", () => {
    it("should get employees by employer id", async () => {
      const mockEmployees = [
        {
          id: "employee-1",
          userId: "user-1",
          employerId: "employer-id",
          salary: 50000,
          user: { id: "user-1", email: "user1@example.com" },
          employer: { id: "employer-id", companyName: "Test Company" },
          kycReviewer: null,
        },
        {
          id: "employee-2",
          userId: "user-2",
          employerId: "employer-id",
          salary: 60000,
          user: { id: "user-2", email: "user2@example.com" },
          employer: { id: "employer-id", companyName: "Test Company" },
          kycReviewer: null,
        },
      ];

      prisma.employee.findMany.mockResolvedValue(mockEmployees);

      const result = await employeeService.getByEmployerId("employer-id");

      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        where: { employerId: "employer-id" },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual(mockEmployees);
    });

    it("should return empty array when no employees found for employer", async () => {
      prisma.employee.findMany.mockResolvedValue([]);

      const result = await employeeService.getByEmployerId("employer-id");

      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        where: { employerId: "employer-id" },
        include: {
          user: true,
          employer: true,
          kycReviewer: true,
        },
      });
      expect(result).toEqual([]);
    });

    it("should handle database errors", async () => {
      const error = new Error("Database query failed");
      prisma.employee.findMany.mockRejectedValue(error);

      await expect(
        employeeService.getByEmployerId("employer-id"),
      ).rejects.toThrow("Database query failed");
    });
  });

  describe("error handling", () => {
    it("should handle database connection errors in get", async () => {
      const dbError = new Error("Database connection failed");
      prisma.employee.findUnique.mockRejectedValue(dbError);

      await expect(employeeService.get({ id: "test-id" })).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should handle validation errors in create", async () => {
      const validationError = new Error("Invalid data format");
      prisma.employee.create.mockRejectedValue(validationError);

      await expect(
        employeeService.create({
          userId: "invalid-user",
          employerId: "invalid-employer",
          registrationDate: new Date(),
        }),
      ).rejects.toThrow("Invalid data format");
    });

    it("should handle transaction errors", async () => {
      const transactionError = new Error("Transaction failed");
      prisma.employee.update.mockRejectedValue(transactionError);

      await expect(
        employeeService.update("employee-id", { salary: 90000 }),
      ).rejects.toThrow("Transaction failed");
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new Error("Query timeout");
      prisma.employee.findMany.mockRejectedValue(timeoutError);

      await expect(employeeService.getAll()).rejects.toThrow("Query timeout");
    });
  });
});
