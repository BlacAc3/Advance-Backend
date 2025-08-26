import request from "supertest";
import app from "../index";
import { prisma } from "../db/database";
import { generateTokenPair } from "../utils/jwt";
import { createTestUser, createTestEmployer } from "./utils/testUtils";
import { EnumUsersRole } from "../generated/prisma";
import bcrypt from "bcrypt";

describe("Admin Routes Integration", () => {
  let adminUser: any;
  let adminToken: string;
  let regularUser: any;
  let employer: any;
  let employee: any;
  let advance: any;

  beforeAll(async () => {
    // Create admin user and get token
    adminUser = await createTestUser(
      `admin-${Date.now()}@example.com`,
      "AdminPassword123!",
      EnumUsersRole.ADMIN,
    );
    adminToken = (await generateTokenPair(adminUser)).accessToken;

    // Create a regular user
    regularUser = await createTestUser(
      `user-${Date.now()}@example.com`,
      "UserPassword123!",
      EnumUsersRole.EMPLOYEE,
    );

    // Create employer and employee
    employer = await createTestEmployer(
      `employer-${Date.now()}@example.com`,
      "EmployerPassword123!",
      `Company-${Date.now()}`,
    );
    const employeeUser = await createTestUser(
      `employee-${Date.now()}@example.com`,
      "EmployeePassword123!",
      EnumUsersRole.EMPLOYEE,
    );
    employee = await prisma.employee.create({
      data: {
        userId: employeeUser.id,
        employerId: employer.id,
        salary: 500000,
        registrationDate: new Date(),
        daysWorked: 20,
        creditScore: 600,
        termsAccepted: true,
        kycStatus: "approved",
      },
    });

    // Create an advance
    advance = await prisma.advance.create({
      data: {
        employeeId: employee.id,
        employerId: employer.id,
        amount: 20000,
        serviceFee: 600,
        serviceFeePercentage: 3,
        netAmount: 19400,
        repaymentAmount: 20000,
        earnedToDate: 250000,
        availableAdvance: 25000,
        requestDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "DISBURSED",
      },
    });
  });

  afterAll(async () => {
    await prisma.advance.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("GET /api/v1/admin/users", () => {
    it("should return all users for admin", async () => {
      const res = await request(app)
        .get("/api/v1/admin/users")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((u: any) => u.id === adminUser.id)).toBe(true);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .get("/api/v1/admin/users")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });

    it("should reject unauthenticated access", async () => {
      const res = await request(app).get("/api/v1/admin/users");
      expect(res.status).toBe(401);
    });
  });

  describe("PUT /api/v1/admin/users/:id", () => {
    it("should update a user role and isActive", async () => {
      const res = await request(app)
        .put(`/api/v1/admin/users/${regularUser.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ role: EnumUsersRole.EMPLOYER, isActive: false });
      expect(res.status).toBe(200);
      expect(res.body.role).toBe(EnumUsersRole.EMPLOYER);
      expect(res.body.isActive).toBe(false);
    });

    it("should return 404 for non-existent user", async () => {
      const res = await request(app)
        .put(`/api/v1/admin/users/01993901994488710020999982736455`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ role: EnumUsersRole.EMPLOYER });
      expect(res.status).toBe(404);
    });

    it("should reject invalid role", async () => {
      const res = await request(app)
        .put(`/api/v1/admin/users/${regularUser.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ role: "INVALID_ROLE" });
      expect(res.status).toBe(400);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .put(`/api/v1/admin/users/${regularUser.id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ role: EnumUsersRole.EMPLOYER });
      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/v1/admin/users/:id", () => {
    it("should delete a user", async () => {
      const tempUser = await createTestUser(
        `temp-${Date.now()}@example.com`,
        "TempPassword123!",
        EnumUsersRole.EMPLOYEE,
      );
      const res = await request(app)
        .delete(`/api/v1/admin/users/${tempUser.id}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(204);
    });

    it("should return 404 for non-existent user", async () => {
      const res = await request(app)
        .delete(`/api/v1/admin/users/12345678901234567890123456789012`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .delete(`/api/v1/admin/users/${regularUser.id}`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/v1/admin/invitations", () => {
    it("should return all invitations", async () => {
      const res = await request(app)
        .get("/api/v1/admin/invitations")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .get("/api/v1/admin/invitations")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/v1/admin/employers", () => {
    it("should return all employers", async () => {
      const res = await request(app)
        .get("/api/v1/admin/employers")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((e: any) => e.id === employer.id)).toBe(true);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .get("/api/v1/admin/employers")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("PUT /api/v1/admin/employers/:id/verify", () => {
    it("should verify an employer", async () => {
      const res = await request(app)
        .put(`/api/v1/admin/employers/${employer.id}/verify`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("verified");
      expect(res.body.employer.isVerified).toBe(true);
    });

    it("should return 404 for non-existent employer", async () => {
      const res = await request(app)
        .put(`/api/v1/admin/employers/12345678901234567890123456789012/verify`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .put(`/api/v1/admin/employers/${employer.id}/verify`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/v1/admin/employees", () => {
    it("should return all employees", async () => {
      const res = await request(app)
        .get("/api/v1/admin/employees")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((e: any) => e.id === employee.id)).toBe(true);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .get("/api/v1/admin/employees")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/v1/admin/advances", () => {
    it("should return all advances", async () => {
      const res = await request(app)
        .get("/api/v1/admin/advances")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((a: any) => a.id === advance.id)).toBe(true);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .get("/api/v1/admin/advances")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/v1/admin/advances/:id", () => {
    it("should return advance details", async () => {
      const res = await request(app)
        .get(`/api/v1/admin/advances/${advance.id}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(advance.id);
    });

    it("should return 404 for non-existent advance", async () => {
      const res = await request(app)
        .get(`/api/v1/admin/advances/12345678901234567890123456789012`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });

    it("should reject non-admin access", async () => {
      const userToken = (await generateTokenPair(regularUser)).accessToken;
      const res = await request(app)
        .get(`/api/v1/admin/advances/${advance.id}`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });
  });
});
