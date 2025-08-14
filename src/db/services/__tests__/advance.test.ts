import { prisma } from "../../database";
import advanceService from "../advance";
import {
  EnumUsersRole,
  EnumEmployerTier,
  EnumAdvancesStatus,
} from "../../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

describe("Advance Service Tests", () => {
  let employer: any;
  let employee: any;
  let advance1: any;
  let advance2: any;

  beforeEach(async () => {
    // Clean database
    await prisma.advance.deleteMany();
    await prisma.liquidityPool.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();

    // Create test data
    const hashedPassword = await bcrypt.hash("Test123!", 10);

    const employerUser = await prisma.user.create({
      data: {
        email: "employer@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYER,
      },
    });

    employer = await prisma.employer.create({
      data: {
        userId: employerUser.id,
        companyName: "Test Company",
        registrationDate: new Date(),
        isVerified: true,
        tier: EnumEmployerTier.API_VERIFIED,
        advancePercentageLimit: 30,
      },
    });

    const employeeUser = await prisma.user.create({
      data: {
        email: "employee@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYEE,
      },
    });

    employee = await prisma.employee.create({
      data: {
        userId: employeeUser.id,
        employerId: employer.id,
        salary: new Decimal(500000),
        registrationDate: new Date(),
        creditScore: 650,
        totalAdvancesTaken: 5,
        totalAdvancesRepaid: 3,
      },
    });

    // Create test advances
    advance1 = await prisma.advance.create({
      data: {
        employeeId: employee.id,
        employerId: employer.id,
        amount: new Decimal(25000),
        serviceFee: new Decimal(750),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(24250),
        repaymentAmount: new Decimal(25000),
        earnedToDate: new Decimal(250000),
        availableAdvance: new Decimal(75000),
        requestDate: new Date("2024-01-01"),
        dueDate: new Date("2024-01-31"),
        status: EnumAdvancesStatus.DISBURSED,
      },
    });

    advance2 = await prisma.advance.create({
      data: {
        employeeId: employee.id,
        employerId: employer.id,
        amount: new Decimal(15000),
        serviceFee: new Decimal(450),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(14550),
        repaymentAmount: new Decimal(15000),
        earnedToDate: new Decimal(300000),
        availableAdvance: new Decimal(90000),
        requestDate: new Date("2024-01-15"),
        dueDate: new Date("2024-02-15"),
        status: EnumAdvancesStatus.REPAID,
      },
    });
  });

  afterEach(async () => {
    await prisma.advance.deleteMany();
    await prisma.liquidityPool.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("get", () => {
    it("should get advance by id", async () => {
      const result = await advanceService.get({ id: advance1.id });
      expect(result).toBeTruthy();
      expect((result as any).id).toBe(advance1.id);
      expect((result as any).amount.toString()).toBe("25000");
      expect((result as any).employee).toBeTruthy();
      expect((result as any).employee.user).toBeTruthy();
    });

    it("should get advances by employeeId", async () => {
      const results: any = await advanceService.get({
        employeeId: employee.id,
      });
      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(2);
      expect(results[0].employeeId).toBe(employee.id);
    });

    it("should get advances by employerId", async () => {
      const results: any = await advanceService.get({
        employerId: employer.id,
      });
      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(2);
      expect(results[0].employerId).toBe(employer.id);
    });

    it("should throw error when no parameters provided", async () => {
      await expect(advanceService.get({})).rejects.toThrow(
        "Either id, employeeId, or employerId must be provided",
      );
    });
  });

  describe("create", () => {
    it("should create a new advance", async () => {
      const newAdvanceData = {
        employeeId: employee.id,
        employerId: employer.id,
        amount: new Decimal(20000),
        serviceFee: new Decimal(600),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(19400),
        repaymentAmount: new Decimal(20000),
        earnedToDate: new Decimal(200000),
        availableAdvance: new Decimal(60000),
        requestDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: EnumAdvancesStatus.PENDING,
      };

      const result = await advanceService.create(newAdvanceData);
      expect(result).toBeTruthy();
      expect(result.amount.toString()).toBe("20000");
      expect(result.status).toBe(EnumAdvancesStatus.PENDING);
      expect(result.employee).toBeTruthy();
    });
  });

  describe("update", () => {
    it("should update advance status", async () => {
      const updateData = {
        status: EnumAdvancesStatus.APPROVED,
        approvalDate: new Date(),
      };

      const result = await advanceService.update(advance1.id, updateData);
      expect(result.status).toBe(EnumAdvancesStatus.APPROVED);
      expect(result.approvalDate).toBeTruthy();
    });

    it("should update disbursement information", async () => {
      const updateData = {
        status: EnumAdvancesStatus.DISBURSED,
        disbursementDate: new Date(),
        transactionHash: "0x123456789",
      };

      const result = await advanceService.update(advance1.id, updateData);
      expect(result.status).toBe(EnumAdvancesStatus.DISBURSED);
      expect(result.disbursementDate).toBeTruthy();
      expect(result.transactionHash).toBe("0x123456789");
    });

    it("should update rejection information", async () => {
      const updateData = {
        status: EnumAdvancesStatus.REJECTED,
        // rejectedBy: "rejecter-id", //This causes a db error as the db expects a foreign key
        rejectionReason: "Insufficient work history",
      };

      const result = await advanceService.update(advance1.id, updateData);
      expect(result.status).toBe(EnumAdvancesStatus.REJECTED);
      expect(result.rejectionReason).toBe("Insufficient work history");
    });
  });

  describe("delete", () => {
    it("should delete an advance", async () => {
      const result = await advanceService.delete(advance1.id);
      expect(result.id).toBe(advance1.id);

      const deleted = await prisma.advance.findUnique({
        where: { id: advance1.id },
      });
      expect(deleted).toBeNull();
    });
  });

  describe("getByStatus", () => {
    it("should get advances by status", async () => {
      const results = await advanceService.getByStatus(
        EnumAdvancesStatus.DISBURSED,
      );
      expect(results).toHaveLength(1);
      expect(results[0].status).toBe(EnumAdvancesStatus.DISBURSED);
    });

    it("should get advances by status and employerId", async () => {
      const results = await advanceService.getByStatus(
        EnumAdvancesStatus.REPAID,
        employer.id,
      );
      expect(results).toHaveLength(1);
      expect(results[0].status).toBe(EnumAdvancesStatus.REPAID);
      expect(results[0].employerId).toBe(employer.id);
    });

    it("should return empty array when no matches", async () => {
      const results = await advanceService.getByStatus(
        EnumAdvancesStatus.DEFAULTED,
      );
      expect(results).toHaveLength(0);
    });
  });

  describe("getOutstandingByEmployee", () => {
    it("should get outstanding advances for employee", async () => {
      const results = await advanceService.getOutstandingByEmployee(
        employee.id,
      );
      expect(results).toHaveLength(1);
      expect(results[0].status).toBe(EnumAdvancesStatus.DISBURSED);
    });

    it("should not include repaid advances", async () => {
      const results = await advanceService.getOutstandingByEmployee(
        employee.id,
      );
      const repaidAdvance = results.find((a: any) => a.id === advance2.id);
      expect(repaidAdvance).toBeUndefined();
    });

    it("should include multiple outstanding statuses", async () => {
      await prisma.advance.create({
        data: {
          employeeId: employee.id,
          employerId: employer.id,
          amount: new Decimal(10000),
          serviceFee: new Decimal(300),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(9700),
          repaymentAmount: new Decimal(10000),
          earnedToDate: new Decimal(100000),
          availableAdvance: new Decimal(30000),
          requestDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
        },
      });

      const results = await advanceService.getOutstandingByEmployee(
        employee.id,
      );
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("getStatistics", () => {
    it("should calculate statistics for all advances", async () => {
      const stats = await advanceService.getStatistics();
      expect(stats.totalCount).toBe(2);
      expect(stats.disbursedCount).toBe(1);
      expect(stats.repaidCount).toBe(1);
      expect(stats.defaultedCount).toBe(0);
      expect(stats.repaymentRate).toBe(50); // 1 repaid out of 2
    });

    it("should calculate statistics for specific employer", async () => {
      const stats = await advanceService.getStatistics(employer.id);
      expect(stats.totalCount).toBe(2);
      expect(stats.totalAmount.toString()).toBe("40000"); // 25000 + 15000
    });

    it("should handle empty statistics", async () => {
      await prisma.advance.deleteMany();
      const stats = await advanceService.getStatistics();
      expect(stats.totalCount).toBe(0);
      expect(stats.defaultRate).toBe(0);
      expect(stats.repaymentRate).toBe(0);
    });
  });

  describe("getOverdueAdvances", () => {
    it("should get overdue advances", async () => {
      // Create an overdue advance
      await prisma.advance.create({
        data: {
          employeeId: employee.id,
          employerId: employer.id,
          amount: new Decimal(5000),
          serviceFee: new Decimal(150),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(4850),
          repaymentAmount: new Decimal(5000),
          earnedToDate: new Decimal(50000),
          availableAdvance: new Decimal(15000),
          requestDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          status: EnumAdvancesStatus.DISBURSED,
        },
      });

      const results = await advanceService.getOverdueAdvances();
      expect(results.length).toBeGreaterThanOrEqual(1);
      const overdue = results.find(
        (a: any) =>
          a.dueDate < new Date() && a.status === EnumAdvancesStatus.DISBURSED,
      );
      expect(overdue).toBeTruthy();
    });

    it("should not include repaid advances", async () => {
      const results = await advanceService.getOverdueAdvances();
      const repaid = results.find(
        (a: any) => a.status === EnumAdvancesStatus.REPAID,
      );
      expect(repaid).toBeUndefined();
    });
  });

  describe("getAdvancesByDateRange", () => {
    it("should get advances within date range", async () => {
      const startDate = new Date("2024-01-01");
      const endDate = new Date("2024-01-10");

      const results = await advanceService.getAdvancesByDateRange(
        startDate,
        endDate,
      );
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(advance1.id);
    });

    it("should filter by employerId", async () => {
      const startDate = new Date("2024-01-01");
      const endDate = new Date("2024-02-28");

      const results = await advanceService.getAdvancesByDateRange(
        startDate,
        endDate,
        employer.id,
      );
      expect(results).toHaveLength(2);
      expect(results.every((a: any) => a.employerId === employer.id)).toBe(
        true,
      );
    });

    it("should return empty array when no matches", async () => {
      const startDate = new Date("2023-01-01");
      const endDate = new Date("2023-12-31");

      const results = await advanceService.getAdvancesByDateRange(
        startDate,
        endDate,
      );
      expect(results).toHaveLength(0);
    });
  });

  describe("calculatePoolUtilization", () => {
    beforeEach(async () => {
      // Add liquidity pool
      await prisma.liquidityPool.create({
        data: {
          employerId: employer.id,
          amount: new Decimal(1000000),
          transactionType: "CONTRIBUTION",
          transactionHash: "0xabc123",
          timestamp: new Date(),
        },
      });
    });

    it("should calculate pool utilization", async () => {
      const utilization = await advanceService.calculatePoolUtilization();
      expect(utilization.totalPool).toBe("1000000");
      expect(utilization.totalOutstanding).toBe("25000"); // Only advance1 is DISBURSED
      expect(utilization.availableLiquidity).toBe("975000");
      expect(utilization.utilizationPercentage).toBe(2.5); // 25000/1000000 * 100
    });

    it("should calculate pool utilization for specific employer", async () => {
      const utilization = await advanceService.calculatePoolUtilization(
        employer.id,
      );
      expect(utilization.totalPool).toBe("1000000");
      expect(utilization.totalOutstanding).toBe("25000");
    });

    it("should handle zero pool amount", async () => {
      await prisma.liquidityPool.deleteMany();
      const utilization = await advanceService.calculatePoolUtilization();
      expect(utilization.totalPool).toBe("0");
      expect(utilization.availableLiquidity).toBe("0");
      expect(utilization.utilizationPercentage).toBe(0);
    });

    it("should handle multiple liquidity contributions", async () => {
      await prisma.liquidityPool.create({
        data: {
          employerId: employer.id,
          amount: new Decimal(500000),
          transactionType: "CONTRIBUTION",
          transactionHash: "0xdef456",
          timestamp: new Date(),
        },
      });

      const utilization = await advanceService.calculatePoolUtilization(
        employer.id,
      );
      expect(utilization.totalPool).toBe("1500000");
      expect(utilization.utilizationPercentage).toBeCloseTo(1.67, 1); // 25000/1500000 * 100
    });
  });

  describe("bulkUpdateStatus", () => {
    it("should update multiple advances status", async () => {
      const advanceIds = [advance1.id, advance2.id];
      const result = await advanceService.bulkUpdateStatus(
        advanceIds,
        EnumAdvancesStatus.DEFAULTED,
      );

      expect(result.count).toBe(2);

      const updated = await prisma.advance.findMany({
        where: { id: { in: advanceIds } },
      });
      expect(
        updated.every((a) => a.status === EnumAdvancesStatus.DEFAULTED),
      ).toBe(true);
    });

    it("should update with additional data", async () => {
      const advanceIds = [advance1.id];
      const updateData = {
        paymentDate: new Date(),
        repaymentTransactionHash: "0x789xyz",
      };

      await advanceService.bulkUpdateStatus(
        advanceIds,
        EnumAdvancesStatus.REPAID,
        updateData,
      );

      const updated = await prisma.advance.findUnique({
        where: { id: advance1.id },
      });
      expect(updated?.status).toBe(EnumAdvancesStatus.REPAID);
      expect(updated?.paymentDate).toBeTruthy();
      expect(updated?.repaymentTransactionHash).toBe("0x789xyz");
    });

    it("should handle empty array", async () => {
      const result = await advanceService.bulkUpdateStatus(
        [],
        EnumAdvancesStatus.APPROVED,
      );
      expect(result.count).toBe(0);
    });
  });

  describe("Integration scenarios", () => {
    it("should handle complete advance lifecycle", async () => {
      // Create advance
      const newAdvance = await advanceService.create({
        employeeId: employee.id,
        employerId: employer.id,
        amount: new Decimal(30000),
        serviceFee: new Decimal(900),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(29100),
        repaymentAmount: new Decimal(30000),
        earnedToDate: new Decimal(300000),
        availableAdvance: new Decimal(90000),
        requestDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: EnumAdvancesStatus.PENDING,
      });

      // Approve
      let updated = await advanceService.update(newAdvance.id, {
        status: EnumAdvancesStatus.APPROVED,
        approvalDate: new Date(),
      });
      expect(updated.status).toBe(EnumAdvancesStatus.APPROVED);

      // Disburse
      updated = await advanceService.update(newAdvance.id, {
        status: EnumAdvancesStatus.DISBURSED,
        disbursementDate: new Date(),
        transactionHash: "0xabc123",
      });
      expect(updated.status).toBe(EnumAdvancesStatus.DISBURSED);

      // Check outstanding
      const outstanding = await advanceService.getOutstandingByEmployee(
        employee.id,
      );
      expect(outstanding.find((a: any) => a.id === newAdvance.id)).toBeTruthy();

      // Repay
      updated = await advanceService.update(newAdvance.id, {
        status: EnumAdvancesStatus.REPAID,
        paymentDate: new Date(),
        repaymentTransactionHash: "0xdef456",
      });
      expect(updated.status).toBe(EnumAdvancesStatus.REPAID);

      // Check statistics
      const stats = await advanceService.getStatistics(employer.id);
      expect(stats.repaidCount).toBe(2); // advance2 + newAdvance
    });

    it("should correctly calculate statistics with mixed statuses", async () => {
      // Create advances with various statuses
      await prisma.advance.createMany({
        data: [
          {
            employeeId: employee.id,
            employerId: employer.id,
            amount: new Decimal(10000),
            serviceFee: new Decimal(300),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(9700),
            repaymentAmount: new Decimal(10000),
            earnedToDate: new Decimal(100000),
            availableAdvance: new Decimal(30000),
            requestDate: new Date(),
            dueDate: new Date(),
            status: EnumAdvancesStatus.DEFAULTED,
          },
          {
            employeeId: employee.id,
            employerId: employer.id,
            amount: new Decimal(5000),
            serviceFee: new Decimal(150),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(4850),
            repaymentAmount: new Decimal(5000),
            earnedToDate: new Decimal(50000),
            availableAdvance: new Decimal(15000),
            requestDate: new Date(),
            dueDate: new Date(),
            status: EnumAdvancesStatus.PENDING,
          },
        ],
      });

      const stats = await advanceService.getStatistics(employer.id);
      expect(stats.totalCount).toBe(4);
      expect(stats.pendingCount).toBe(1);
      expect(stats.disbursedCount).toBe(1);
      expect(stats.repaidCount).toBe(1);
      expect(stats.defaultedCount).toBe(1);
      expect(stats.defaultRate).toBe(25); // 1/4 * 100
      expect(stats.totalAmount.toString()).toBe("55000"); // 25000 + 15000 + 10000 + 5000
      expect(stats.totalDefaulted.toString()).toBe("10000");
    });
  });
});
