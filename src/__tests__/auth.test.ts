import request from "supertest";
import app from "../index";
import { User } from "../models/User";
import { UserRole, TokenPayload } from "../types";
import { createTestUser, generateTestTokens } from "./utils/testUtils";
import { generateTokenPair } from "../utils/jwt";

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
      // console.log("---------------------------------------------------------");
      // console.log(response.body);

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.role).toBe(userData.role);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
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

      expect(response.body).toHaveProperty("status");
      expect(response.body.status).toBe("error");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    let email = "testuser@example.com";
    let password = "testPassword123";
    beforeAll(async () => {
      const user = await createTestUser(email, password);
    });

    it("should login user successfully", async () => {
      const loginData = {
        email,
        password,
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
    });

    it("should not login with incorrect password", async () => {
      const loginData = {
        email,
        password: "an incorrect password",
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      // expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("status");
      expect(response.body.status).toBe("error");
    });
  });

  describe("POST /api/v1/auth/refresh-token", () => {
    let user: User;
    let accessToken: string;
    let refreshToken: string;

    beforeAll(async () => {
      // Use a unique email for this test block
      user = await createTestUser(
        `refresh_${Date.now()}@example.com`,
        "testPassword123",
      );
    });

    // Generate and STORE tokens (specifically refresh token in Redis) before EACH test
    // This ensures the token exists in Redis after beforeEach in setup.ts flushes it
    beforeEach(async () => {
      const payload: TokenPayload = {
        userId: user.id,
        role: user.role,
        walletAddress: user.walletAddress, // Include walletAddress as per generateTokenPair payload
      };
      const tokens = await generateTokenPair(payload); // generateTokenPair stores refresh token in Redis
      accessToken = tokens.accessToken; // Keep accessToken if needed for other tests in this block
      refreshToken = tokens.refreshToken;
    });

    it("should refresh token successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
    });

    it("should not refresh with invalid token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({ refreshToken: "invalid-token" });

      // expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("status");
      expect(response.body.status).toBe("error");
    });
  });

  describe("GET /api/v1/auth/me", () => {
    let user: User;
    let accessToken: string;
    let refreshToken: string;

    beforeAll(async () => {
      // Use a unique email for this test block
      user = await createTestUser(
        `user_test_profile@example.com`,
        "testPassword123",
      );
    });

    // Generate and STORE tokens (specifically refresh token in Redis) before EACH test
    // This ensures the token exists in Redis after beforeEach in setup.ts flushes it
    beforeEach(async () => {
      const payload: TokenPayload = {
        userId: String(user.id),
        role: user.role,
        walletAddress: user.walletAddress, // Include walletAddress as per generateTokenPair payload
      };
      const tokens = await generateTokenPair(payload); // generateTokenPair stores refresh token in Redis
      accessToken = tokens.accessToken; // Keep accessToken if needed for other tests in this block
      refreshToken = tokens.refreshToken;
    });
    it("should get current user profile", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", `Bearer ${accessToken}`);

      console.log("-------------------------------------");
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("role");
    });

    it("should not get profile without token", async () => {
      const response = await request(app).get("/api/v1/auth/me");

      expect(response.status).toBe(401);
    });

    it("should not get profile with invalid token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    });
  });
});
