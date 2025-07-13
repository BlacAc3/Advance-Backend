import request from "supertest";
import app from "../index";
import { UserRole } from "../types";
import { createTestUser } from "./utils/testUtils";
import { generateTokenPair } from "../utils/jwt";
import userService from "../db/services/user";

describe("Authentication", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      // Use a unique email for this test
      const email = `register_${Date.now()}@example.com`;
      const userData = {
        email: email,
        password: "TestPassword123!",
        role: UserRole.REGULAR_USER,
        walletAddress: "0x" + "1".repeat(40),
        username: `testuser_${Date.now()}`,
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);
      console.log("---------------------------------------------------------");
      // console.log(response.body);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    }, 30000);

    it("should not register user with existing email", async () => {
      // Create a user first
      const existingEmail = `existing_${Date.now()}@example.com`;
      await createTestUser(existingEmail, "ExistingPassword123!");

      const userData = {
        email: existingEmail, // Use the existing email
        password: "NewPassword123!",
        role: UserRole.WEB3_USER,
        walletAddress: "0x" + "2".repeat(40),
        username: `existinguser${Date.now()}`,
      };

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      // According to auth.controller.ts, existing email returns 400
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toContain("User must be registering");

      // Clean up the created user
      // await User.destroy({ where: { email: existingEmail } });
      const user = await userService.get({ email: existingEmail });
      if (user) {
        // await userService.update(user.id, { isActive: false });  // Soft delete, if you have update functionality
      }
    });
  });

  describe("POST /api/v1/auth/login", () => {
    let email = `login_${Date.now()}@example.com`;
    let password = "testPassword123";
    beforeAll(async () => {
      await createTestUser(email, password);
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
      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    });

    it("should not login with incorrect password", async () => {
      const loginData = {
        email,
        password: "an incorrect password",
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      // According to auth.controller.ts, incorrect password returns 401
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should not login with non-existent email", async () => {
      const loginData = {
        email: `nonexistent_${Date.now()}@example.com`,
        password: "anypassword",
      };

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(loginData);

      // According to auth.controller.ts, non-existent email returns 401
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid email or password");
    });
  });

  describe("POST /api/v1/auth/refresh-token", () => {
    let user: any;
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
      const tokens = await generateTokenPair(user); // generateTokenPair stores refresh token in Redis
      refreshToken = tokens.refreshToken;
    });

    it("should refresh token successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({ refreshToken });

      // Default status for res.json is 200
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    });

    it("should not refresh with invalid token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({ refreshToken: "invalid-token" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toContain("Failed to refresh token");
    });

    it("should not refresh without a token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .send({}); // No refresh token provided

      // According to auth.controller.ts, missing token returns 400
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Refresh token is required");
    });
  });

  describe("GET /api/v1/auth/me", () => {
    let user: any;
    let accessToken: string;

    beforeAll(async () => {
      // Use a unique email for this test block
      user = await createTestUser(
        `user_test_profile_${Date.now()}@example.com`,
        "testPassword123",
      );

      const tokens = await generateTokenPair(user); // generateTokenPair stores refresh token in Redis
      accessToken = tokens.accessToken; // Keep accessToken if needed for other tests in this block
    });

    // Generate tokens (specifically refresh token in Redis) before EACH test
    // This ensures the token exists in Redis after beforeEach in setup.ts flushes it
    // beforeEach(async () => {
    // });
    it("should get current user profile", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", `Bearer ${accessToken}`);

      // console.log("-------------------------------------");
      // console.log(response.body); // Keep console log for debugging if needed

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("role");
      expect(response.body.data.id).toBe(user.id); // Verify the correct user is returned
    });

    it("should not get profile without token", async () => {
      const response = await request(app).get("/api/v1/auth/me");

      // According to auth.controller.ts (implicitly handled by middleware before controller), missing token returns 401
      expect(response.status).toBe(401);
      // Optional: check for message body if the middleware returns one, e.g., { message: "Unauthorized" }
      expect(response.body).toHaveProperty("message");
    });

    it("should not get profile with invalid token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set("Authorization", "Bearer invalid-token");

      // Invalid tokens are typically handled by auth middleware returning 401
      // console.log(response.body); // Keep console log for debugging if needed
      expect(response.status).toBe(401);
      // The controller itself returns 401 with "Unauthorized" if the auth middleware fails to attach user
      expect(response.body).toHaveProperty("message");
    });
  });
});
