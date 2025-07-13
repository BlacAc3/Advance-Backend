import request from "supertest";
import app from "../index";
import { v4 as uuidv4 } from "uuid";
import { UserRole } from "../types";
import jwt from "jsonwebtoken";
import * as dbConfig from "../db/database";
import { hashPassword } from "../utils/password";
import userService from "../db/services/user";
import invitationService from "../db/services/invitation";
import { generateTokenPair } from "../utils/jwt";
import { createTestUser, createTestMarketer } from "./utils/testUtils";

let employerUser: any;
let accessToken: any;
beforeEach(async () => {
  employerUser = await createTestUser(
    `employer-${Date.now()}@example.com`,
    "TestPassword123",
    UserRole.EMPLOYER,
  );
  const tokens = await generateTokenPair(employerUser);
  accessToken = tokens.accessToken;
});

// beforeEach(async () => {});

describe("Employer Controller", () => {
  beforeAll(async () => {
    // Create a user with employer role
  });

  describe("POST /api/v1/employer/send-invite", () => {
    it("should send an invitation successfully", async () => {
      const mockEmail = "employee@example.com";

      const response = await request(app)
        .post("/api/v1/employer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ email: mockEmail });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Invitation sent successfully");

      // Clean created invitation
      const inviteId = response.body.data.id;
    });

    it("should return an error if an invitation already exists", async () => {
      const mockEmail = "employee@example.com";

      // Create invitation
      const newInvitation = {
        id: uuidv4(),
        targetEmail: mockEmail,
        senderUserId: employerUser.id,
        role: "EMPLOYEE",
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      };
      await invitationService.create({
        email: newInvitation.targetEmail,
        senderId: newInvitation.senderUserId,
        role: "EMPLOYEE",
        expiresAt: newInvitation.expiresAt,
      });

      const response = await request(app)
        .post("/api/v1/employer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ email: mockEmail });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invitation for the target user already exists",
      );
    });
  });

  describe("POST /api/v1/employer/register", () => {
    let marketerUser: any;
    let marketerAccessToken: any;
    beforeAll(async () => {
      marketerUser = await createTestMarketer(
        `marketer-${Date.now()}@example.com`,
        "TestPassword123",
      );
      const tokens = await generateTokenPair(marketerUser);
      marketerAccessToken = tokens.accessToken;
    });

    it("should register an employer successfully", async () => {
      const mockEmail = `new_employer_${Date.now()}@example.com`;
      const mockCompanyName = "New Test Company";
      const mockPassword = "TestPassword123!";

      // Create invitation
      const newInvitation = await invitationService.create({
        email: mockEmail,
        senderId: marketerUser.id,
        role: "EMPLOYER",
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      });

      const userData = {
        email: mockEmail,
        password: "TestPassword123!",
        role: "EMPLOYER",
        companyName: mockCompanyName,
        invitationId: newInvitation.id,
      };

      const response = await request(app)
        .post("/api/v1/employer/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Employer registered successfully");
    });

    it("should not register an employer with an invalid invitationId", async () => {
      const mockEmail = "invalid_employer@example.com";
      const mockCompanyName = "Invalid Test Company";
      const invalidInvitationId = uuidv4();

      const userData = {
        email: mockEmail,
        password: "TestPassword123!",
        companyName: mockCompanyName,
        role: UserRole.EMPLOYER,
        invitationId: invalidInvitationId,
      };

      const response = await request(app)
        .post("/api/v1/employer/register")
        .send(userData);

      expect(response.status).toBe(404);
      // expect(response.body).toBe(false);
      // expect(response.body.message).toBe("Invitation not found");
    });
  });
});
