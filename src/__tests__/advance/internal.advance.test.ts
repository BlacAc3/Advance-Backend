import request from "supertest";
import app from "../../index";
import { prisma } from "../../db/database";
import { generateTestTokens } from "../utils/testUtils";
import {
  EnumUsersRole,
  EnumEmployerTier,
  EnumAdvancesStatus,
} from "../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

describe("Internal Advance System Controller Tests", () => {
  let adminUser: any;
  let adminToken: string;
  let employer: any;
  let employee1: any;
  let employee2: any;
  let advance1: any;
  let advance2: any;

  beforeEach(async () => {
    // Clean database
    await prisma.advance.deleteMany();
    await prisma.riskAdjustment.deleteMany();
    await prisma.reserveFund.deleteMany();
    await prisma.liquidityPool.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    const hashedPassword = await bcrypt.hash("Admin123!", 10);
    adminUser = await prisma.user.create({
      data: {
        email: "admin@test.com",
        password: hashedPassword,
        role: EnumUsersRole.ADMIN,
      },
    });

    const adminTokens = generateTestTokens({
      id: adminUser.id,
      role: adminUser.role,
    });
    adminToken = adminTokens.accessToken;

    // Create employer
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
        companyName: "Test Corp",
        registrationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 4 months ago
        isVerified: true,
        tier: EnumEmployerTier.API_VERIFIED,
        advancePercentageLimit: 30,
        autoApproveAdvances: true,
        totalAdvancesProcessed: 50,
        defaultRate: new Decimal(2),
      },
    });

    // Create employees
    const employee1User = await prisma.user.create({
      data: {
        email: "employee1@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYEE,
      },
    });

    employee1 = await prisma.employee.create({
      data: {
        userId: employee1User.id,
        employerId: employer.id,
        salary: new Decimal(600000),
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        creditScore: 700,
        totalAdvancesTaken: 5,
        totalAdvancesRepaid: 4,
        currentAdvanceBalance: new Decimal(30000),
      },
    });

    const employee2User = await prisma.user.create({
      data: {
        email: "employee2@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYEE,
      },
    });

    employee2 = await prisma.employee.create({
      data: {
        userId: employee2User.id,
        employerId: employer.id,
        salary: new Decimal(450000),
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        registrationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        creditScore: 650,
        totalAdvancesTaken: 3,
        totalAdvancesRepaid: 2,
        currentAdvanceBalance: new Decimal(20000),
      },
    });

    // Create outstanding advances
    advance1 = await prisma.advance.create({
      data: {
        employeeId: employee1.id,
        employerId: employer.id,
        amount: new Decimal(30000),
        serviceFee: new Decimal(900),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(29100),
        repaymentAmount: new Decimal(30000),
        earnedToDate: new Decimal(400000),
        availableAdvance: new Decimal(120000),
        requestDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: EnumAdvancesStatus.DISBURSED,
      },
    });

    advance2 = await prisma.advance.create({
      data: {
        employeeId: employee2.id,
        employerId: employer.id,
        amount: new Decimal(20000),
        serviceFee: new Decimal(600),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(19400),
        repaymentAmount: new Decimal(20000),
        earnedToDate: new Decimal(300000),
        availableAdvance: new Decimal(90000),
        requestDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: EnumAdvancesStatus.DISBURSED,
      },
    });

    // Add liquidity pool
    await prisma.liquidityPool.create({
      data: {
        employerId: employer.id,
        amount: new Decimal(5000000),
        transactionType: "CONTRIBUTION",
        transactionHash: "0x1234567890",
        timestamp: new Date(),
      },
    });
  });

  describe("POST /api/v1/internal/payroll/process-payment", () => {
    it("should process payroll and auto-deduct advances", async () => {
      const payrollData = {
        employerId: employer.id,
        payrollData: [
          {
            employeeId: employee1.id,
            salary: "600000",
            paymentDate: new Date().toISOString(),
          },
          {
            employeeId: employee2.id,
            salary: "450000",
            paymentDate: new Date().toISOString(),
          },
        ],
        totalAmount: "1050000",
        transactionHash: "0xabc123def456",
      };

      const response = await request(app)
        .post("/api/v1/internal/payroll/process-payment")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payrollData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.processedPayments).toHaveLength(2);

      // Check first employee payment
      const payment1 = response.body.data.processedPayments[0];
      expect(payment1.employeeId).toBe(employee1.id);
      expect(payment1.grossSalary).toBe("600000");
      expect(payment1.totalDeduction).toBe("30000");
      expect(payment1.netSalary).toBe("570000");
      expect(payment1.repaidAdvances).toHaveLength(1);

      // Check second employee payment
      const payment2 = response.body.data.processedPayments[1];
      expect(payment2.employeeId).toBe(employee2.id);
      expect(payment2.grossSalary).toBe("450000");
      expect(payment2.totalDeduction).toBe("20000");
      expect(payment2.netSalary).toBe("430000");

      // Verify advances were marked as repaid
      const updatedAdvance1 = await prisma.advance.findUnique({
        where: { id: advance1.id },
      });
      expect(updatedAdvance1?.status).toBe("REPAID");
      expect(updatedAdvance1?.repaymentTransactionHash).toBe("0xabc123def456");

      // Verify employee balances were reset
      const updatedEmployee1 = await prisma.employee.findUnique({
        where: { id: employee1.id },
      });
      expect(updatedEmployee1?.currentAdvanceBalance.toString()).toBe("0");
      expect(updatedEmployee1?.totalAdvancesRepaid).toBe(5);
      expect(updatedEmployee1?.creditScore).toBeGreaterThan(700);
    });

    it("should handle multiple advances for same employee", async () => {
      // Create another advance for employee1
      await prisma.advance.create({
        data: {
          employeeId: employee1.id,
          employerId: employer.id,
          amount: new Decimal(15000),
          serviceFee: new Decimal(450),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(14550),
          repaymentAmount: new Decimal(15000),
          earnedToDate: new Decimal(400000),
          availableAdvance: new Decimal(120000),
          requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
          status: EnumAdvancesStatus.DISBURSED,
        },
      });

      const payrollData = {
        employerId: employer.id,
        payrollData: [
          {
            employeeId: employee1.id,
            salary: "600000",
            paymentDate: new Date().toISOString(),
          },
        ],
        totalAmount: "600000",
      };

      const response = await request(app)
        .post("/api/v1/internal/payroll/process-payment")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payrollData);

      expect(response.status).toBe(200);
      const payment = response.body.data.processedPayments[0];
      expect(payment.totalDeduction).toBe("45000"); // 30000 + 15000
      expect(payment.repaidAdvances).toHaveLength(2);
    });

    it("should return 404 for non-existent employer", async () => {
      const response = await request(app)
        .post("/api/v1/internal/payroll/process-payment")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          employerId: "non-existent-id",
          payrollData: [],
          totalAmount: "0",
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Employer not found");
    });

    it("should require admin authorization", async () => {
      const employeeToken = generateTestTokens({
        id: employee1.id,
        role: EnumUsersRole.EMPLOYEE,
      }).accessToken;

      const response = await request(app)
        .post("/api/v1/internal/payroll/process-payment")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          employerId: employer.id,
          payrollData: [],
          totalAmount: "0",
        });

      expect(response.status).toBe(403);
    });
  });

  describe("POST /api/v1/internal/risk/adjustments", () => {
    it("should adjust limits based on employer default rate", async () => {
      // Update employer to have high default rate
      await prisma.employer.update({
        where: { id: employer.id },
        data: { defaultRate: new Decimal(7) },
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/adjustments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          type: "EMPLOYER_DEFAULT_RATE",
          employerId: employer.id,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.adjustments).toHaveLength(1);
      expect(response.body.data.adjustments[0].type).toBe(
        "ADVANCE_LIMIT_REDUCTION",
      );

      // Verify employer limits were reduced
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.advancePercentageLimit).toBeLessThan(30);
      expect(updatedEmployer?.autoApproveAdvances).toBe(false);

      // Verify risk adjustment was logged
      const riskAdjustment = await prisma.riskAdjustment.findFirst({
        where: {
          employerId: employer.id,
          adjustmentType: "ADVANCE_LIMIT_REDUCTION",
        },
      });
      expect(riskAdjustment).toBeTruthy();
    });

    it("should downgrade tier for very high default rate", async () => {
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          defaultRate: new Decimal(12),
          tier: EnumEmployerTier.API_VERIFIED,
        },
      });

      // Create some defaulted advances
      await prisma.advance.create({
        data: {
          employeeId: employee1.id,
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
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/adjustments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          type: "EMPLOYER_DEFAULT_RATE",
          employerId: employer.id,
        });

      expect(response.status).toBe(200);

      // Should have both limit reduction and tier downgrade
      const adjustments = response.body.data.adjustments;
      expect(adjustments.length).toBeGreaterThanOrEqual(2);

      const tierDowngrade = adjustments.find(
        (a: any) => a.type === "TIER_DOWNGRADE",
      );
      expect(tierDowngrade).toBeTruthy();
      expect(tierDowngrade.newTier).toBe("NEW");

      // Verify database update
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.tier).toBe("NEW");
    });

    it("should handle pool utilization adjustments", async () => {
      // Create high pool utilization
      await prisma.advance.createMany({
        data: Array(10)
          .fill(null)
          .map((_, i) => ({
            employeeId: i % 2 === 0 ? employee1.id : employee2.id,
            employerId: employer.id,
            amount: new Decimal(400000),
            serviceFee: new Decimal(12000),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(388000),
            repaymentAmount: new Decimal(400000),
            earnedToDate: new Decimal(400000),
            availableAdvance: new Decimal(120000),
            requestDate: new Date(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: EnumAdvancesStatus.DISBURSED,
          })),
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/adjustments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          type: "POOL_UTILIZATION",
        });

      expect(response.status).toBe(200);
      expect(response.body.data.adjustments.length).toBeGreaterThan(0);

      // Verify limits were reduced
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.advancePercentageLimit).toBeLessThan(30);
    });

    it("should deploy reserve fund for high monthly defaults", async () => {
      // Create recent defaulted advances
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 25);

      await prisma.advance.createMany({
        data: [
          {
            employeeId: employee1.id,
            employerId: employer.id,
            amount: new Decimal(100000),
            serviceFee: new Decimal(3000),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(97000),
            repaymentAmount: new Decimal(100000),
            earnedToDate: new Decimal(500000),
            availableAdvance: new Decimal(150000),
            requestDate: thirtyDaysAgo,
            dueDate: new Date(),
            status: EnumAdvancesStatus.DEFAULTED,
            updatedAt: new Date(),
          },
          {
            employeeId: employee2.id,
            employerId: employer.id,
            amount: new Decimal(80000),
            serviceFee: new Decimal(2400),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(77600),
            repaymentAmount: new Decimal(80000),
            earnedToDate: new Decimal(400000),
            availableAdvance: new Decimal(120000),
            requestDate: thirtyDaysAgo,
            dueDate: new Date(),
            status: EnumAdvancesStatus.DEFAULTED,
            updatedAt: new Date(),
          },
        ],
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/adjustments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          type: "MONTHLY_DEFAULTS",
        });

      expect(response.status).toBe(200);

      // Check for reserve fund deployment
      const reserveFundAdjustment = response.body.data.adjustments.find(
        (a: any) => a.type === "RESERVE_FUND_DEPLOYMENT",
      );
      expect(reserveFundAdjustment).toBeTruthy();

      // Verify reserve fund entry was created
      const reserveFund = await prisma.reserveFund.findFirst({
        where: { transactionType: "LP_PROTECTION" },
      });
      expect(reserveFund).toBeTruthy();
      expect(reserveFund?.amount.toNumber()).toBeGreaterThan(0);
    });
  });

  describe("POST /api/v1/internal/risk/tier-upgrade", () => {
    it("should upgrade eligible employers", async () => {
      // Create an employer eligible for upgrade
      const newEmployerUser = await prisma.user.create({
        data: {
          email: "newemployer@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYER,
        },
      });

      const eligibleEmployer = await prisma.employer.create({
        data: {
          userId: newEmployerUser.id,
          companyName: "Eligible Corp",
          registrationDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 100 days ago
          isVerified: true,
          tier: EnumEmployerTier.NEW,
          bankHistoryVerified: true,
          advancePercentageLimit: 10,
        },
      });

      // Create good performance history
      await prisma.advance.createMany({
        data: Array(20)
          .fill(null)
          .map(() => ({
            employeeId: employee1.id,
            employerId: eligibleEmployer.id,
            amount: new Decimal(10000),
            serviceFee: new Decimal(300),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(9700),
            repaymentAmount: new Decimal(10000),
            earnedToDate: new Decimal(100000),
            availableAdvance: new Decimal(10000),
            requestDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            status: EnumAdvancesStatus.REPAID,
          })),
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/tier-upgrade")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.data.upgrades.length).toBeGreaterThan(0);

      const upgrade = response.body.data.upgrades.find(
        (u: any) => u.employerId === eligibleEmployer.id,
      );
      expect(upgrade).toBeTruthy();
      expect(upgrade.newTier).toBe("API_VERIFIED");
      expect(upgrade.newLimit).toBe(30);

      // Verify database update
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: eligibleEmployer.id },
      });
      expect(updatedEmployer?.tier).toBe("API_VERIFIED");
      expect(updatedEmployer?.advancePercentageLimit).toBe(30);
    });

    it("should upgrade to PLATFORM_TRUSTED for excellent performance", async () => {
      // Update existing employer to be eligible
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          tier: EnumEmployerTier.API_VERIFIED,
          createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 200 days ago
        },
      });

      // Create excellent performance history
      await prisma.advance.createMany({
        data: Array(60)
          .fill(null)
          .map(() => ({
            employeeId: employee1.id,
            employerId: employer.id,
            amount: new Decimal(20000),
            serviceFee: new Decimal(600),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(19400),
            repaymentAmount: new Decimal(20000),
            earnedToDate: new Decimal(200000),
            availableAdvance: new Decimal(60000),
            requestDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            dueDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            status: EnumAdvancesStatus.REPAID,
          })),
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/tier-upgrade")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);

      const upgrade = response.body.data.upgrades.find(
        (u: any) => u.employerId === employer.id,
      );
      expect(upgrade).toBeTruthy();
      expect(upgrade.newTier).toBe("PLATFORM_TRUSTED");
      expect(upgrade.newLimit).toBe(50);
    });

    it("should not upgrade employers with poor performance", async () => {
      // Create employer with poor performance
      const poorEmployerUser = await prisma.user.create({
        data: {
          email: "poor@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYER,
        },
      });

      const poorEmployer = await prisma.employer.create({
        data: {
          userId: poorEmployerUser.id,
          companyName: "Poor Corp",
          registrationDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
          isVerified: true,
          tier: EnumEmployerTier.NEW,
          bankHistoryVerified: true,
        },
      });

      // Create poor performance history (high default rate)
      await prisma.advance.createMany({
        data: [
          {
            employeeId: employee1.id,
            employerId: poorEmployer.id,
            amount: new Decimal(10000),
            serviceFee: new Decimal(300),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(9700),
            repaymentAmount: new Decimal(10000),
            earnedToDate: new Decimal(100000),
            availableAdvance: new Decimal(10000),
            requestDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            status: EnumAdvancesStatus.DEFAULTED,
          },
        ],
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/tier-upgrade")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);

      const upgrade = response.body.data.upgrades.find(
        (u: any) => u.employerId === poorEmployer.id,
      );
      expect(upgrade).toBeFalsy();

      // Verify no change in database
      const unchangedEmployer = await prisma.employer.findUnique({
        where: { id: poorEmployer.id },
      });
      expect(unchangedEmployer?.tier).toBe("NEW");
    });
  });

  describe("POST /api/v1/internal/advances/process-defaults", () => {
    it("should process overdue advances as defaulted", async () => {
      // Create overdue advances
      const overdueDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago

      const overdueAdvance = await prisma.advance.create({
        data: {
          employeeId: employee1.id,
          employerId: employer.id,
          amount: new Decimal(25000),
          serviceFee: new Decimal(750),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(24250),
          repaymentAmount: new Decimal(25000),
          earnedToDate: new Decimal(250000),
          availableAdvance: new Decimal(75000),
          requestDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
          dueDate: overdueDate,
          status: EnumAdvancesStatus.DISBURSED,
        },
      });

      const response = await request(app)
        .post("/api/v1/internal/advances/process-defaults")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.data.processedCount).toBe(1);
      expect(response.body.data.defaultedAdvances).toHaveLength(1);
      expect(
        response.body.data.defaultedAdvances[0].daysPastDue,
      ).toBeGreaterThan(0);

      // Verify advance was marked as defaulted
      const updatedAdvance = await prisma.advance.findUnique({
        where: { id: overdueAdvance.id },
      });
      expect(updatedAdvance?.status).toBe("DEFAULTED");

      // Verify employee credit score was reduced
      const updatedEmployee = await prisma.employee.findUnique({
        where: { id: employee1.id },
      });
      expect(updatedEmployee?.creditScore).toBeLessThan(700);

      // Verify employer default rate was updated
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.defaultRate.toNumber()).toBeGreaterThan(0);
    });

    it("should not process advances that are not overdue", async () => {
      const futureDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days in future

      await prisma.advance.create({
        data: {
          employeeId: employee1.id,
          employerId: employer.id,
          amount: new Decimal(15000),
          serviceFee: new Decimal(450),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(14550),
          repaymentAmount: new Decimal(15000),
          earnedToDate: new Decimal(150000),
          availableAdvance: new Decimal(45000),
          requestDate: new Date(),
          dueDate: futureDate,
          status: EnumAdvancesStatus.DISBURSED,
        },
      });

      const response = await request(app)
        .post("/api/v1/internal/advances/process-defaults")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.data.processedCount).toBe(0);
      expect(response.body.data.defaultedAdvances).toHaveLength(0);
    });

    it("should handle multiple defaulted advances across employers", async () => {
      // Create another employer with overdue advances
      const employer2User = await prisma.user.create({
        data: {
          email: "employer2@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYER,
        },
      });

      const employer2 = await prisma.employer.create({
        data: {
          userId: employer2User.id,
          companyName: "Test Corp 2",
          registrationDate: new Date(),
          isVerified: true,
        },
      });

      const employee3User = await prisma.user.create({
        data: {
          email: "employee3@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYEE,
        },
      });

      const employee3 = await prisma.employee.create({
        data: {
          userId: employee3User.id,
          employerId: employer2.id,
          salary: new Decimal(400000),
          registrationDate: new Date(),
          creditScore: 600,
        },
      });

      // Create overdue advances for both employers
      const overdueDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

      await prisma.advance.createMany({
        data: [
          {
            employeeId: employee1.id,
            employerId: employer.id,
            amount: new Decimal(20000),
            serviceFee: new Decimal(600),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(19400),
            repaymentAmount: new Decimal(20000),
            earnedToDate: new Decimal(200000),
            availableAdvance: new Decimal(60000),
            requestDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
            dueDate: overdueDate,
            status: EnumAdvancesStatus.DISBURSED,
          },
          {
            employeeId: employee3.id,
            employerId: employer2.id,
            amount: new Decimal(15000),
            serviceFee: new Decimal(450),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(14550),
            repaymentAmount: new Decimal(15000),
            earnedToDate: new Decimal(150000),
            availableAdvance: new Decimal(45000),
            requestDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
            dueDate: overdueDate,
            status: EnumAdvancesStatus.PAID,
          },
        ],
      });

      const response = await request(app)
        .post("/api/v1/internal/advances/process-defaults")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.data.processedCount).toBe(2);
      expect(response.body.data.defaultedAdvances).toHaveLength(2);
      expect(response.body.data.affectedEmployers).toBe(2);

      // Verify both employers' default rates were updated
      const [updatedEmployer1, updatedEmployer2] = await Promise.all([
        prisma.employer.findUnique({ where: { id: employer.id } }),
        prisma.employer.findUnique({ where: { id: employer2.id } }),
      ]);

      expect(updatedEmployer1?.defaultRate.toNumber()).toBeGreaterThan(0);
      expect(updatedEmployer2?.defaultRate.toNumber()).toBeGreaterThan(0);
    });

    it("should not process already defaulted advances", async () => {
      const overdueDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

      await prisma.advance.create({
        data: {
          employeeId: employee1.id,
          employerId: employer.id,
          amount: new Decimal(20000),
          serviceFee: new Decimal(600),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(19400),
          repaymentAmount: new Decimal(20000),
          earnedToDate: new Decimal(200000),
          availableAdvance: new Decimal(60000),
          requestDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
          dueDate: overdueDate,
          status: EnumAdvancesStatus.DEFAULTED, // Already defaulted
        },
      });

      const response = await request(app)
        .post("/api/v1/internal/advances/process-defaults")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.data.processedCount).toBe(0);
      expect(response.body.data.defaultedAdvances).toHaveLength(0);
    });
  });

  describe("Edge Cases and Integration Tests", () => {
    it("should handle empty payroll processing", async () => {
      const response = await request(app)
        .post("/api/v1/internal/payroll/process-payment")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          employerId: employer.id,
          payrollData: [],
          totalAmount: "0",
        });

      expect(response.status).toBe(200);
      expect(response.body.data.processedPayments).toHaveLength(0);
      expect(response.body.data.summary.totalEmployees).toBe(0);
    });

    it("should handle risk adjustments with no qualifying employers", async () => {
      // Set all employers to good standing
      await prisma.employer.update({
        where: { id: employer.id },
        data: { defaultRate: new Decimal(0.5) }, // Very low default rate
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/adjustments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          type: "EMPLOYER_DEFAULT_RATE",
          employerId: employer.id,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.adjustments).toHaveLength(0);
    });

    it("should handle tier upgrades with no eligible employers", async () => {
      // Delete all employers or make them ineligible
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          createdAt: new Date(), // Just created, not eligible
        },
      });

      const response = await request(app)
        .post("/api/v1/internal/risk/tier-upgrade")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.data.upgrades).toHaveLength(0);
    });

    it("should maintain data integrity during concurrent operations", async () => {
      // Simulate concurrent payroll processing for same employee
      const payrollData = {
        employerId: employer.id,
        payrollData: [
          {
            employeeId: employee1.id,
            salary: "600000",
            paymentDate: new Date().toISOString(),
          },
        ],
        totalAmount: "600000",
      };

      const requests = Array(2)
        .fill(null)
        .map(() =>
          request(app)
            .post("/api/v1/internal/payroll/process-payment")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(payrollData),
        );

      const responses = await Promise.all(requests);

      // At least one should succeed
      const successfulRequests = responses.filter((r) => r.status === 200);
      expect(successfulRequests.length).toBeGreaterThanOrEqual(1);

      // Check that advances weren't double-processed
      const finalAdvance = await prisma.advance.findUnique({
        where: { id: advance1.id },
      });
      expect(finalAdvance?.status).toBe("REPAID");

      // Employee balance should be zero, not negative
      const finalEmployee = await prisma.employee.findUnique({
        where: { id: employee1.id },
      });
      expect(
        finalEmployee?.currentAdvanceBalance.toNumber(),
      ).toBeGreaterThanOrEqual(0);
    });

    it("should calculate correct pool utilization", async () => {
      // Known pool amount: 5000000
      // Known outstanding: 30000 + 20000 = 50000
      // Expected utilization: (50000 / 5000000) * 100 = 1%

      const response = await request(app)
        .post("/api/v1/internal/risk/adjustments")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          type: "POOL_UTILIZATION",
        });

      expect(response.status).toBe(200);
      // With 1% utilization, no adjustments should be made (threshold is 85%)
      expect(response.body.data.adjustments).toHaveLength(0);
    });

    it("should properly calculate credit score changes", async () => {
      const initialCreditScore = employee1.creditScore;

      // Process a successful repayment
      await request(app)
        .post("/api/v1/internal/payroll/process-payment")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          employerId: employer.id,
          payrollData: [
            {
              employeeId: employee1.id,
              salary: "600000",
              paymentDate: new Date().toISOString(),
            },
          ],
          totalAmount: "600000",
        });

      const afterRepayment = await prisma.employee.findUnique({
        where: { id: employee1.id },
      });
      expect(afterRepayment?.creditScore).toBeGreaterThan(initialCreditScore);

      // Create and process a default
      const overdueAdvance = await prisma.advance.create({
        data: {
          employeeId: employee1.id,
          employerId: employer.id,
          amount: new Decimal(10000),
          serviceFee: new Decimal(300),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(9700),
          repaymentAmount: new Decimal(10000),
          earnedToDate: new Decimal(100000),
          availableAdvance: new Decimal(30000),
          requestDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          status: EnumAdvancesStatus.DISBURSED,
        },
      });

      await request(app)
        .post("/api/v1/internal/advances/process-defaults")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({});

      const afterDefault = await prisma.employee.findUnique({
        where: { id: employee1.id },
      });
      expect(afterDefault?.creditScore).toBeLessThan(
        afterRepayment?.creditScore || 0,
      );
      expect(afterDefault?.creditScore).toBeGreaterThanOrEqual(300); // Minimum score
    });
  });
});
