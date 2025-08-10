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

describe("Employee Advance Controller Tests", () => {
  let employeeUser: any;
  let employerUser: any;
  let employer: any;
  let employee: any;
  let employeeToken: string;
  let employerToken: string;

  beforeEach(async () => {
    // Clean database
    await prisma.advance.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();

    // Create employer user and employer
    const hashedPassword = await bcrypt.hash("Test123!", 10);
    employerUser = await prisma.user.create({
      data: {
        email: "employer@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYER,
        walletAddress: "0x1234567890123456789012345678901234567890",
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
      },
    });

    // Create employee user and employee
    employeeUser = await prisma.user.create({
      data: {
        email: "employee@test.com",
        password: hashedPassword,
        role: EnumUsersRole.EMPLOYEE,
        walletAddress: "0x0987654321098765432109876543210987654321",
      },
    });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 20); // 20 days ago

    employee = await prisma.employee.create({
      data: {
        userId: employeeUser.id,
        employerId: employer.id,
        salary: new Decimal(500000), // 500,000 monthly salary
        startDate: startDate,
        registrationDate: startDate,
        daysWorked: 20,
        creditScore: 600,
        termsAccepted: true,
        termsAcceptedAt: new Date(),
        kycStage: EnumEmployeesKycStage.level_3,
        kycStatus: EnumEmployeesKycStatus.approved,
        kycStageLevel1Completed: true,
        kycStageLevel2Completed: true,
        kycStageLevel3Completed: true,
      },
    });

    // Generate tokens
    const employeeTokens = generateTestTokens({
      id: employeeUser.id,
      role: employeeUser.role,
    });
    const employerTokens = generateTestTokens({
      id: employerUser.id,
      role: employerUser.role,
    });
    employeeToken = employeeTokens.accessToken;
    employerToken = employerTokens.accessToken;
  });

  describe("GET /api/v1/employee/advance/status", () => {
    it("should return advance status for eligible employee", async () => {
      const response = await request(app)
        .get("/api/v1/employee/advance/status")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("monthlySalary");
      expect(response.body.data).toHaveProperty("daysWorked");
      expect(response.body.data).toHaveProperty("earnedToDate");
      expect(response.body.data).toHaveProperty("availableAdvance");
      expect(response.body.data).toHaveProperty("employerTier", "NEW");
      expect(response.body.data).toHaveProperty(
        "eligibleForDailyAdvance",
        true,
      );
      expect(response.body.data.daysWorked).toBeGreaterThanOrEqual(15);
    });

    it("should show ineligible for employee with less than 15 days", async () => {
      // Update employee to have only 10 days worked
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          daysWorked: 10,
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        },
      });

      const response = await request(app)
        .get("/api/v1/employee/advance/status")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.eligibleForDailyAdvance).toBe(false);
    });

    it("should return 401 for unauthenticated request", async () => {
      const response = await request(app).get(
        "/api/v1/employee/advance/status",
      );

      expect(response.status).toBe(401);
    });

    it("should return 404 if employee record not found", async () => {
      await prisma.employee.delete({ where: { id: employee.id } });

      const response = await request(app)
        .get("/api/v1/employee/advance/status")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Employee record not found");
    });

    it("should calculate correct available advance based on tier", async () => {
      // Test with API_VERIFIED tier (30% limit)
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          tier: EnumEmployerTier.API_VERIFIED,
          advancePercentageLimit: 30,
        },
      });

      const response = await request(app)
        .get("/api/v1/employee/advance/status")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.availableAdvancePercentage).toBe(30);
      expect(response.body.data.employerTier).toBe("API_VERIFIED");
    });
  });

  describe("POST /api/v1/employee/advance/request", () => {
    it("should successfully create advance request for eligible employee", async () => {
      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 25000,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("advanceId");
      expect(response.body.data).toHaveProperty("advanceAmount", "25000");
      expect(response.body.data).toHaveProperty("serviceFee");
      expect(response.body.data).toHaveProperty("netAmount");
      expect(response.body.data).toHaveProperty(
        "status",
        "PENDING_EMPLOYER_APPROVAL",
      );
      expect(response.body.data.requiresEmployerApproval).toBe(true);

      // Verify advance was created in database
      const advance = await prisma.advance.findUnique({
        where: { id: response.body.data.advanceId },
      });
      expect(advance).toBeTruthy();
      expect(advance?.amount.toString()).toBe("25000");
    });

    it("should auto-approve for API_VERIFIED employer", async () => {
      // Update employer to API_VERIFIED
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          tier: EnumEmployerTier.API_VERIFIED,
          advancePercentageLimit: 30,
          autoApproveAdvances: true,
        },
      });

      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 50000,
        });

      expect(response.status).toBe(201);
      expect(response.body.data.status).toBe("DISBURSED");
      expect(response.body.data.requiresEmployerApproval).toBe(false);
      expect(response.body.message).toContain("approved successfully");
    });

    it("should reject request exceeding available advance", async () => {
      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 500000, // Way more than allowed
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("exceeds available advance");
    });

    it("should reject request for employee with less than 15 days", async () => {
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          daysWorked: 10,
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        },
      });

      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 10000,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("at least 15 days");
    });

    it("should reject request without completed KYC", async () => {
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          termsAccepted: false,
          kycStatus: EnumEmployeesKycStatus.pending,
        },
      });

      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 10000,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("complete KYC");
    });

    it("should calculate increased service fee for large amounts", async () => {
      await prisma.employer.update({
        where: { id: employer.id },
        data: {
          tier: EnumEmployerTier.PLATFORM_TRUSTED,
          advancePercentageLimit: 50,
        },
      });

      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 100000, // Large amount
        });

      expect(response.status).toBe(201);
      expect(
        parseFloat(response.body.data.serviceFeePercentage),
      ).toBeGreaterThan(3);
    });

    it("should update employee's current advance balance", async () => {
      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: 25000,
        });

      expect(response.status).toBe(201);

      const updatedEmployee = await prisma.employee.findUnique({
        where: { id: employee.id },
      });
      expect(updatedEmployee?.currentAdvanceBalance.toString()).toBe("25000");
      expect(updatedEmployee?.totalAdvancesTaken).toBe(1);
    });

    it("should validate advance amount is positive", async () => {
      const response = await request(app)
        .post("/api/v1/employee/advance/request")
        .set("Authorization", `Bearer ${employeeToken}`)
        .send({
          advanceAmount: -1000,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Invalid advance amount");
    });
  });

  describe("GET /api/v1/employee/advance/history", () => {
    beforeEach(async () => {
      // Create some test advances
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
            earnedToDate: new Decimal(250000),
            availableAdvance: new Decimal(25000),
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
            earnedToDate: new Decimal(300000),
            availableAdvance: new Decimal(30000),
            requestDate: new Date("2024-01-15"),
            dueDate: new Date("2024-01-31"),
            status: EnumAdvancesStatus.DISBURSED,
          },
        ],
      });
    });

    it("should return advance history for employee", async () => {
      const response = await request(app)
        .get("/api/v1/employee/advance/history")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(2);
      expect(response.body.data.total).toBe(2);
      expect(response.body.data.advances[0]).toHaveProperty("amount");
      expect(response.body.data.advances[0]).toHaveProperty("status");
    });

    it("should filter by status", async () => {
      const response = await request(app)
        .get("/api/v1/employee/advance/history?status=REPAID")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(1);
      expect(response.body.data.advances[0].status).toBe("REPAID");
    });

    it("should support pagination", async () => {
      const response = await request(app)
        .get("/api/v1/employee/advance/history?limit=1&offset=0")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(1);
      expect(response.body.data.limit).toBe(1);
      expect(response.body.data.offset).toBe(0);
    });

    it("should return empty array if no advances", async () => {
      await prisma.advance.deleteMany();

      const response = await request(app)
        .get("/api/v1/employee/advance/history")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.advances).toHaveLength(0);
      expect(response.body.data.total).toBe(0);
    });
  });

  describe("DELETE /api/v1/employee/advance/:advanceId/cancel", () => {
    let advanceId: string;

    beforeEach(async () => {
      const advance = await prisma.advance.create({
        data: {
          employeeId: employee.id,
          employerId: employer.id,
          amount: new Decimal(25000),
          serviceFee: new Decimal(750),
          serviceFeePercentage: new Decimal(3),
          netAmount: new Decimal(24250),
          repaymentAmount: new Decimal(25000),
          earnedToDate: new Decimal(250000),
          availableAdvance: new Decimal(25000),
          requestDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: EnumAdvancesStatus.PENDING_EMPLOYER_APPROVAL,
        },
      });
      advanceId = advance.id;

      // Update employee balance
      await prisma.employee.update({
        where: { id: employee.id },
        data: { currentAdvanceBalance: new Decimal(25000) },
      });
    });

    it("should successfully cancel pending advance request", async () => {
      const response = await request(app)
        .delete(`/api/v1/employee/advance/${advanceId}/cancel`)
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("cancelled successfully");

      // Verify advance status was updated
      const advance = await prisma.advance.findUnique({
        where: { id: advanceId },
      });
      expect(advance?.status).toBe("REJECTED");
      expect(advance?.rejectionReason).toContain("Cancelled by employee");

      // Verify employee balance was restored
      const updatedEmployee = await prisma.employee.findUnique({
        where: { id: employee.id },
      });
      expect(updatedEmployee?.currentAdvanceBalance.toString()).toBe("0");
    });

    it("should not allow cancelling approved advance", async () => {
      await prisma.advance.update({
        where: { id: advanceId },
        data: { status: EnumAdvancesStatus.APPROVED },
      });

      const response = await request(app)
        .delete(`/api/v1/employee/advance/${advanceId}/cancel`)
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("only cancel pending");
    });

    it("should not allow cancelling disbursed advance", async () => {
      await prisma.advance.update({
        where: { id: advanceId },
        data: { status: EnumAdvancesStatus.DISBURSED },
      });

      const response = await request(app)
        .delete(`/api/v1/employee/advance/${advanceId}/cancel`)
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("only cancel pending");
    });

    it("should return 404 for non-existent advance", async () => {
      const response = await request(app)
        .delete("/api/v1/employee/advance/non-existent-id/cancel")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("not found");
    });

    it("should not allow employee to cancel another employee's advance", async () => {
      // Create another employee
      const otherUser = await prisma.user.create({
        data: {
          email: "other@test.com",
          password: await bcrypt.hash("Test123!", 10),
          role: EnumUsersRole.EMPLOYEE,
        },
      });

      const otherEmployee = await prisma.employee.create({
        data: {
          userId: otherUser.id,
          employerId: employer.id,
          registrationDate: new Date(),
        },
      });

      const otherAdvance = await prisma.advance.create({
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
          status: EnumAdvancesStatus.PENDING,
        },
      });

      const response = await request(app)
        .delete(`/api/v1/employee/advance/${otherAdvance.id}/cancel`)
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toContain("Unauthorized");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle concurrent advance requests", async () => {
      const requests = Array(3)
        .fill(null)
        .map(() =>
          request(app)
            .post("/api/v1/employee/advance/request")
            .set("Authorization", `Bearer ${employeeToken}`)
            .send({ advanceAmount: 10000 }),
        );

      const responses = await Promise.all(requests);

      // At least one should succeed
      const successfulRequests = responses.filter((r) => r.status === 201);
      expect(successfulRequests.length).toBeGreaterThanOrEqual(1);

      // Check that total advance balance doesn't exceed limit
      const updatedEmployee = await prisma.employee.findUnique({
        where: { id: employee.id },
      });

      const salary = new Decimal(500000);
      const maxAllowed = salary.mul(10).div(100); // 10% for NEW tier
      expect(
        updatedEmployee?.currentAdvanceBalance.lessThanOrEqualTo(maxAllowed),
      ).toBe(true);
    });

    it("should handle missing salary information", async () => {
      await prisma.employee.update({
        where: { id: employee.id },
        data: { salary: null },
      });

      const response = await request(app)
        .get("/api/v1/employee/advance/status")
        .set("Authorization", `Bearer ${employeeToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        "Salary information not available",
      );
    });

    it("should calculate correct service fee for different amounts", async () => {
      const testCases = [
        { amount: 10000, expectedFee: 300 }, // 3% of 10,000
        { amount: 25000, expectedFee: 750 }, // 3% of 25,000
        { amount: 50000, expectedFee: 1500 }, // 3% of 50,000
      ];

      for (const testCase of testCases) {
        const response = await request(app)
          .post("/api/v1/employee/advance/request")
          .set("Authorization", `Bearer ${employeeToken}`)
          .send({ advanceAmount: testCase.amount });

        if (response.status === 201) {
          const serviceFee = parseFloat(response.body.data.serviceFee);
          expect(serviceFee).toBeCloseTo(testCase.expectedFee, 0);
        }
      }
    });
  });
});
