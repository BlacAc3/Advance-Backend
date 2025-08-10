import request from "supertest";
import app from "../../index";
import { prisma } from "../../db/database";
import { generateTestTokens } from "../utils/testUtils";
import {
  EnumUsersRole,
  EnumEmployerTier,
  EnumAdvancesStatus,
  EnumEmployeesKycStage,
  EnumEmployeesKycStatus,
} from "../../generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

describe("Employer Advance Controller Tests", () => {
  let employerUser: any;
  let employer: any;
  let employeeUser: any;
  let employee: any;
  let employerToken: string;
  let employeeToken: string;
  let advance: any;

  beforeEach(async () => {
    // Clean database
    await prisma.advance.deleteMany();
    await prisma.riskAdjustment.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();

    // Create employer
    const hashedPassword = await bcrypt.hash("Test123!", 10);
    employerUser = await prisma.user.create({
      data: {
        email: "employer@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYER,
      },
    });

    employer = await prisma.employer.create({
      data: {
        userId: employerUser.id,
        companyName: "Test Company Ltd",
        registrationDate: new Date(),
        isVerified: true,
        tier: EnumEmployerTier.NEW,
        advancePercentageLimit: 10,
        autoApproveAdvances: false,
        totalAdvancesProcessed: 5,
      },
    });

    // Create employee
    employeeUser = await prisma.user.create({
      data: {
        email: "john.doe@test.com",
        username: "johndoe",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYEE,
      },
    });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    employee = await prisma.employee.create({
      data: {
        userId: employeeUser.id,
        employerId: employer.id,
        salary: new Decimal(500000),
        startDate: startDate,
        registrationDate: startDate,
        daysWorked: 30,
        creditScore: 650,
        totalAdvancesTaken: 2,
        totalAdvancesRepaid: 1,
        termsAccepted: true,
        kycStatus: EnumEmployeesKycStatus.approved,
      },
    });

    // Create a pending advance
    advance = await prisma.advance.create({
      data: {
        employeeId: employee.id,
        employerId: employer.id,
        amount: new Decimal(30000),
        serviceFee: new Decimal(900),
        serviceFeePercentage: new Decimal(3),
        netAmount: new Decimal(29100),
        repaymentAmount: new Decimal(30000),
        earnedToDate: new Decimal(300000),
        availableAdvance: new Decimal(30000),
        requestDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
        riskScore: 700,
      },
    });

    // Generate tokens
    const employerTokens = generateTestTokens({
      id: employerUser.id,
      role: employerUser.role,
    });
    const employeeTokens = generateTestTokens({
      id: employeeUser.id,
      role: employeeUser.role,
    });
    employerToken = employerTokens.accessToken;
    employeeToken = employeeTokens.accessToken;

    // Add liquidity pool funds
    await prisma.liquidityPool.create({
      data: {
        employerId: employer.id,
        amount: new Decimal(1000000),
        transactionType: "CONTRIBUTION",
        transactionHash: "0x123456789",
        timestamp: new Date(),
      },
    });
  });

  describe("GET /api/v1/employer/advances/pending", () => {
    it("should return pending advance requests", async () => {
      const response = await request(app)
        .get("/api/v1/employer/advances/pending")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty("id", advance.id);
      expect(response.body.data[0]).toHaveProperty("employeeName", "johndoe");
      expect(response.body.data[0]).toHaveProperty("amount", "30000");
      expect(response.body.data[0]).toHaveProperty("riskScore", 700);
      expect(response.body.data[0]).toHaveProperty("creditScore", 650);
    });

    it("should return empty array when no pending advances", async () => {
      await prisma.advance.update({
        where: { id: advance.id },
        data: { status: EnumAdvancesStatus.APPROVED },
      });

      const response = await request(app)
        .get("/api/v1/employer/advances/pending")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });

    it("should not return other employer's advances", async () => {
      // Create another employer
      const otherEmployerUser = await prisma.user.create({
        data: {
          email: "other@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYER,
        },
      });

      const otherEmployer = await prisma.employer.create({
        data: {
          userId: otherEmployerUser.id,
          companyName: "Other Company",
          registrationDate: new Date(),
        },
      });

      // Create advance for other employer
      await prisma.advance.create({
        data: {
          employeeId: employee.id,
          employerId: otherEmployer.id,
          amount: new Decimal(20000),
          serviceFee: new Decimal(600),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(19400),
          repaymentAmount: new Decimal(20000),
          earnedToDate: new Decimal(200000),
          availableAdvance: new Decimal(20000),
          requestDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
        },
      });

      const response = await request(app)
        .get("/api/v1/employer/advances/pending")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].id).toBe(advance.id);
    });

    it("should return 401 for unauthenticated request", async () => {
      const response = await request(app).get(
        "/api/v1/employer/advances/pending",
      );

      expect(response.status).toBe(401);
    });

    it("should return 403 for non-employer user", async () => {
      const response = await request(app)
        .get("/api/v1/employer/advances/pending")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("POST /api/v1/employer/advance/:requestId/approve", () => {
    it("should successfully approve advance request", async () => {
      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/approve`)
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          approvalNotes: "Approved based on good standing",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("advanceId", advance.id);
      expect(response.body.data).toHaveProperty("status", "DISBURSED");
      expect(response.body.data).toHaveProperty("approvalDate");
      expect(response.body.data).toHaveProperty("disbursementDate");

      // Verify database update
      const updatedAdvance = await prisma.advance.findUnique({
        where: { id: advance.id },
      });
      expect(updatedAdvance?.status).toBe("DISBURSED");
      expect(updatedAdvance?.approvedBy).toBe(employerUser.id);
      expect(updatedAdvance?.approvalDate).toBeTruthy();
    });

    it("should update employer statistics after approval", async () => {
      await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/approve`)
        .set("Authorization", `Bearer ${employerToken}`);

      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.totalAdvancesProcessed).toBe(6);
    });

    it("should reject approval if insufficient liquidity", async () => {
      // Remove liquidity
      await prisma.liquidityPool.deleteMany();

      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/approve`)
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Insufficient liquidity");
    });

    it("should not allow approving already approved advance", async () => {
      await prisma.advance.update({
        where: { id: advance.id },
        data: { status: EnumAdvancesStatus.APPROVED },
      });

      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/approve`)
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("not pending approval");
    });

    it("should not allow employer to approve another employer's advance", async () => {
      // Create another employer
      const otherEmployerUser = await prisma.user.create({
        data: {
          email: "other@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYER,
        },
      });

      await prisma.employer.create({
        data: {
          userId: otherEmployerUser.id,
          companyName: "Other Company",
          registrationDate: new Date(),
        },
      });

      const otherEmployerTokens = generateTestTokens({
        id: otherEmployerUser.id,
        role: otherEmployerUser.role,
      });

      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/approve`)
        .set("Authorization", `Bearer ${otherEmployerTokens.accessToken}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toContain("Unauthorized");
    });

    it("should return 404 for non-existent advance", async () => {
      const response = await request(app)
        .post("/api/v1/employer/advance/non-existent-id/approve")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/v1/employer/advance/:requestId/reject", () => {
    it("should successfully reject advance request", async () => {
      // Set employee balance
      await prisma.employee.update({
        where: { id: employee.id },
        data: { currentAdvanceBalance: new Decimal(30000) },
      });

      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/reject`)
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          rejectionReason: "Insufficient work history",
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("advanceId", advance.id);
      expect(response.body.data).toHaveProperty("status", "REJECTED");
      expect(response.body.data).toHaveProperty(
        "rejectionReason",
        "Insufficient work history",
      );

      // Verify database update
      const updatedAdvance = await prisma.advance.findUnique({
        where: { id: advance.id },
      });
      expect(updatedAdvance?.status).toBe("REJECTED");
      expect(updatedAdvance?.rejectedBy).toBe(employerUser.id);
      expect(updatedAdvance?.rejectionReason).toBe("Insufficient work history");

      // Verify employee balance was restored
      const updatedEmployee = await prisma.employee.findUnique({
        where: { id: employee.id },
      });
      expect(updatedEmployee?.currentAdvanceBalance.toString()).toBe("0");
    });

    it("should require rejection reason", async () => {
      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/reject`)
        .set("Authorization", `Bearer ${employerToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Rejection reason is required");
    });

    it("should not allow rejecting non-pending advance", async () => {
      await prisma.advance.update({
        where: { id: advance.id },
        data: { status: EnumAdvancesStatus.DISBURSED },
      });

      const response = await request(app)
        .post(`/api/v1/employer/advance/${advance.id}/reject`)
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          rejectionReason: "Test reason",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("not pending approval");
    });
  });

  describe("GET /api/v1/employer/advances/all", () => {
    beforeEach(async () => {
      // Create additional advances with different statuses
      await prisma.advance.createMany({
        data: [
          {
            employeeId: employee.id,
            employerId: employer.id,
            amount: new Decimal(20000),
            serviceFee: new Decimal(600),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(19400),
            repaymentAmount: new Decimal(20000),
            earnedToDate: new Decimal(200000),
            availableAdvance: new Decimal(20000),
            requestDate: new Date("2024-01-01"),
            dueDate: new Date("2024-01-31"),
            status: EnumAdvancesStatus.REPAID,
          },
          {
            employeeId: employee.id,
            employerId: employer.id,
            amount: new Decimal(15000),
            serviceFee: new Decimal(450),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(14550),
            repaymentAmount: new Decimal(15000),
            earnedToDate: new Decimal(150000),
            availableAdvance: new Decimal(15000),
            requestDate: new Date("2024-01-15"),
            dueDate: new Date("2024-02-15"),
            status: EnumAdvancesStatus.DISBURSED,
          },
        ],
      });
    });

    it("should return all advances for employer", async () => {
      const response = await request(app)
        .get("/api/v1/employer/advances/all")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(3);
      expect(response.body.data.total).toBe(3);
    });

    it("should filter by status", async () => {
      const response = await request(app)
        .get("/api/v1/employer/advances/all?status=REPAID")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(1);
      expect(response.body.data.advances[0].status).toBe("REPAID");
    });

    it("should filter by employee", async () => {
      // Create another employee with advance
      const otherEmployeeUser = await prisma.user.create({
        data: {
          email: "jane@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYEE,
        },
      });

      const otherEmployee = await prisma.employee.create({
        data: {
          userId: otherEmployeeUser.id,
          employerId: employer.id,
          registrationDate: new Date(),
        },
      });

      await prisma.advance.create({
        data: {
          employeeId: otherEmployee.id,
          employerId: employer.id,
          amount: new Decimal(10000),
          serviceFee: new Decimal(300),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(9700),
          repaymentAmount: new Decimal(10000),
          earnedToDate: new Decimal(100000),
          availableAdvance: new Decimal(10000),
          requestDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: EnumAdvancesStatus.DISBURSED,
        },
      });

      const response = await request(app)
        .get(`/api/v1/employer/advances/all?employeeId=${employee.id}`)
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(3);
      expect(
        response.body.data.advances.every(
          (a: any) => a.employeeId === employee.id,
        ),
      ).toBe(true);
    });

    it("should support pagination", async () => {
      const response = await request(app)
        .get("/api/v1/employer/advances/all?limit=2&offset=1")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(2);
      expect(response.body.data.limit).toBe(2);
      expect(response.body.data.offset).toBe(1);
    });
  });

  describe("GET /api/v1/employer/advances/statistics", () => {
    beforeEach(async () => {
      // Create more test data for statistics
      await prisma.advance.createMany({
        data: [
          {
            employeeId: employee.id,
            employerId: employer.id,
            amount: new Decimal(25000),
            serviceFee: new Decimal(750),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(24250),
            repaymentAmount: new Decimal(25000),
            earnedToDate: new Decimal(250000),
            availableAdvance: new Decimal(25000),
            requestDate: new Date("2024-01-01"),
            dueDate: new Date("2024-01-31"),
            status: EnumAdvancesStatus.REPAID,
          },
          {
            employeeId: employee.id,
            employerId: employer.id,
            amount: new Decimal(10000),
            serviceFee: new Decimal(300),
            serviceFeePercentage: new Decimal(3),
            netAmount: new Decimal(9700),
            repaymentAmount: new Decimal(10000),
            earnedToDate: new Decimal(100000),
            availableAdvance: new Decimal(10000),
            requestDate: new Date("2024-01-15"),
            dueDate: new Date("2024-02-15"),
            status: EnumAdvancesStatus.DEFAULTED,
          },
        ],
      });

      // Update employee balance
      await prisma.employee.update({
        where: { id: employee.id },
        data: { currentAdvanceBalance: new Decimal(30000) },
      });
    });

    it("should return comprehensive statistics", async () => {
      const response = await request(app)
        .get("/api/v1/employer/advances/statistics")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.summary).toHaveProperty("totalAdvances", 3);
      expect(response.body.data.summary).toHaveProperty("pendingAdvances", 1);
      expect(response.body.data.summary).toHaveProperty("repaidAdvances", 1);
      expect(response.body.data.summary).toHaveProperty("defaultedAdvances", 1);
      expect(response.body.data.summary).toHaveProperty("activeEmployees", 1);

      expect(response.body.data.amounts).toHaveProperty("totalAdvanceAmount");
      expect(response.body.data.amounts).toHaveProperty(
        "totalRepaidAmount",
        "25000",
      );
      expect(response.body.data.amounts).toHaveProperty(
        "totalDefaultedAmount",
        "10000",
      );

      expect(response.body.data.metrics).toHaveProperty("defaultRate", "33.33");
      expect(response.body.data.metrics).toHaveProperty("employerTier", "NEW");
      expect(response.body.data.metrics).toHaveProperty(
        "advancePercentageLimit",
        10,
      );
    });

    it("should handle empty statistics", async () => {
      // Delete all advances
      await prisma.advance.deleteMany();

      const response = await request(app)
        .get("/api/v1/employer/advances/statistics")
        .set("Authorization", `Bearer ${employerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.summary.totalAdvances).toBe(0);
      expect(response.body.data.amounts.totalAdvanceAmount).toBe("0");
      expect(response.body.data.metrics.defaultRate).toBe("0.00");
    });
  });

  describe("PUT /api/v1/employer/advances/settings", () => {
    it("should update advance settings", async () => {
      const response = await request(app)
        .put("/api/v1/employer/advances/settings")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          autoApproveAdvances: true,
          advancePercentageLimit: 8,
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("autoApproveAdvances", true);
      expect(response.body.data).toHaveProperty("advancePercentageLimit", 8);

      // Verify database update
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.autoApproveAdvances).toBe(true);
      expect(updatedEmployer?.advancePercentageLimit).toBe(8);
    });

    it("should not allow exceeding tier limit", async () => {
      const response = await request(app)
        .put("/api/v1/employer/advances/settings")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          advancePercentageLimit: 15, // Exceeds NEW tier limit of 10%
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("must be between 0 and 10");
    });

    it("should allow higher limits for API_VERIFIED tier", async () => {
      await prisma.employer.update({
        where: { id: employer.id },
        data: { tier: EnumEmployerTier.API_VERIFIED },
      });

      const response = await request(app)
        .put("/api/v1/employer/advances/settings")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          advancePercentageLimit: 25,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.advancePercentageLimit).toBe(25);
    });

    it("should allow highest limits for PLATFORM_TRUSTED tier", async () => {
      await prisma.employer.update({
        where: { id: employer.id },
        data: { tier: EnumEmployerTier.PLATFORM_TRUSTED },
      });

      const response = await request(app)
        .put("/api/v1/employer/advances/settings")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          advancePercentageLimit: 45,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.advancePercentageLimit).toBe(45);
    });

    it("should handle partial updates", async () => {
      const response = await request(app)
        .put("/api/v1/employer/advances/settings")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          autoApproveAdvances: true,
          // Not updating advancePercentageLimit
        });

      expect(response.status).toBe(200);
      expect(response.body.data.autoApproveAdvances).toBe(true);
      expect(response.body.data.advancePercentageLimit).toBe(10); // Unchanged
    });

    it("should validate negative advance percentage", async () => {
      const response = await request(app)
        .put("/api/v1/employer/advances/settings")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          advancePercentageLimit: -5,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("must be between 0");
    });
  });

  describe("POST /api/v1/employer/setup-api-integration", () => {
    it("should successfully setup API integration and upgrade tier", async () => {
      const response = await request(app)
        .post("/api/v1/employer/setup-api-integration")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          apiProvider: "mono",
          apiKey: "test-api-key-123",
          accountId: "account-123",
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("tier", "API_VERIFIED");
      expect(response.body.data).toHaveProperty("advancePercentageLimit", 30);
      expect(response.body.data).toHaveProperty("autoApproveAdvances", true);
      expect(response.body.data).toHaveProperty("bankHistoryVerified", true);

      // Verify database updates
      const updatedEmployer = await prisma.employer.findUnique({
        where: { id: employer.id },
      });
      expect(updatedEmployer?.tier).toBe("API_VERIFIED");
      expect(updatedEmployer?.bankHistoryVerified).toBe(true);

      // Verify risk adjustment was logged
      const riskAdjustment = await prisma.riskAdjustment.findFirst({
        where: { employerId: employer.id },
      });
      expect(riskAdjustment).toBeTruthy();
      expect(riskAdjustment?.adjustmentType).toBe("TIER_UPGRADE");
    });

    it("should require all API integration fields", async () => {
      const response = await request(app)
        .post("/api/v1/employer/setup-api-integration")
        .set("Authorization", `Bearer ${employerToken}`)
        .send({
          apiProvider: "mono",
          // Missing apiKey and accountId
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        "API provider, API key, and account ID are required",
      );
    });

    it("should not allow employee to setup API integration", async () => {
      const response = await request(app)
        .post("/api/v1/employer/setup-api-integration")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          apiProvider: "mono",
          apiKey: "test-api-key",
          accountId: "account-123",
        });

      expect(response.status).toBe(403);
    });
  });
});
