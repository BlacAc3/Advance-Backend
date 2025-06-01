import request from "supertest";
import app from "../index";
// import { User } from '../models/User';
import { UserRole } from "../types";
import { createTestUser, generateTestTokens } from "./utils/testUtils";

describe("Authentication", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        email: "test@example.com",
        password: "TestPassword123!",
        role: UserRole.EMPLOYEE,
        walletAddress: "0x" + "1".repeat(40),
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);
      console.log("---------------------------------------------------------");

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data.user).toHaveProperty("id");
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.role).toBe(userData.role);
      expect(response.body.data.tokens).toHaveProperty("accessToken");
      expect(response.body.data.tokens).toHaveProperty("refreshToken");
    });

    it("should not register user with invalid email", async () => {
      const userData = {
        email: "invalid-email",
        password: "TestPassword123!",
        role: UserRole.EMPLOYEE,
        walletAddress: "0x" + "1".repeat(40),
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });

    it("should not register user with invalid wallet address", async () => {
      const userData = {
        email: "test@example.com",
        password: "TestPassword123!",
        role: UserRole.EMPLOYEE,
        walletAddress: "invalid-address",
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await createTestUser(UserRole.EMPLOYEE);
    });

    it("should login user successfully", async () => {
      const loginData = {
        email: "test.employee@example.com",
        password: "testPassword123",
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.tokens).toHaveProperty("accessToken");
      expect(response.body.data.tokens).toHaveProperty("refreshToken");
    });

    it("should not login with incorrect password", async () => {
      const loginData = {
        email: "test.employee@example.com",
        password: "wrongPassword",
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("error");
    });
  });

  describe("POST /api/v1/auth/refresh-token", () => {
    let refreshToken: string;

    beforeEach(async () => {
      const user = await createTestUser(UserRole.EMPLOYEE);
      const tokens = generateTestTokens(user);
      refreshToken = tokens.refreshToken;
    });

    it("should refresh token successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    });

    it("should not refresh with invalid token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({ refreshToken: "invalid-token" });

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("error");
    });
  });

  describe("GET /api/v1/auth/me", () => {
    let accessToken: string;

    beforeEach(async () => {
      const user = await createTestUser(UserRole.EMPLOYEE);
      const tokens = generateTestTokens(user);
      accessToken = tokens.accessToken;
    });

    it("should get current user profile", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.user).toHaveProperty("id");
      expect(response.body.data.user).toHaveProperty("email");
      expect(response.body.data.user).toHaveProperty("role");
    });

    it("should not get profile without token", async () => {
      const response = await request(app).get("/api/v1/auth/me");

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("error");
    });

    it("should not get profile with invalid token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body.status).toBe("error");
    });
  });
});
