// Advance-Backend/src/__tests__/marketer.test.ts // Adjusted file path for consistency with other tests

import request from "supertest";
import app from "../index"; // Import the main app instance
import { createTestMarketer } from "./utils/testUtils";
import { generateTokenPair } from "../utils/jwt";
import {
  EnumUsersRole,
  EnumInvitationsRole,
  EnumInvitationsStatus,
} from "../generated/prisma";
import userService from "../db/services/user"; // For user service interactions
import invitationService from "../db/services/invitation"; // For invitation service interactions

// Define TokenPayload interface and extend Express Request type for mocking req.user.
// In a full application, this would typically be in a shared declaration file
// (e.g., src/types/express.d.ts) to avoid duplication across test files.
interface TokenPayload {
  userId: string;
  role: string;
  // Add other properties if req.user is expected to have them in a real scenario
}

declare module "express-serve-static-core" {
  interface Request {
    user?: TokenPayload;
  }
}

// Global variables for marketer user and access token, similar to other test files
let marketerUser: any;
let anotherMarketerUser: any;
let accessToken: string;

// --- Test Suite (Integration Tests) ---
describe("Marketer Controller", () => {
  // Setup a unique marketer user and generate an access token before each test.
  // This ensures a clean and isolated authenticated state for each test case.
  beforeAll(async () => {
    marketerUser = await createTestMarketer(
      `marketer-${Date.now()}@example.com`,
      "TestPassword123",
    );
    anotherMarketerUser = await createTestMarketer(
      `another-marketer-${Date.now()}@example.com`,
      "TestPassword123",
    );
    const tokens = await generateTokenPair(marketerUser);
    accessToken = tokens.accessToken;

    // Following the pattern of auth.test.ts and employer.test.ts,
    // explicit global `deleteMany` calls are omitted here.
    // Tests rely on unique identifiers (e.g., `Date.now()` in emails)
    // for isolation, and specific cleanup within tests for persistent data.
  });
  beforeEach(async () => {
    // Delete all invitation data to ensure a clean slate before each test.
    // This typically involves calling a method on the invitationService
    // that internally uses Prisma's deleteMany on the Invitation model.
    // E.g., await prisma.invitation.deleteMany({}); would be called by this service method.
    await invitationService.deleteAll();
  });

  describe("POST /api/v1/marketer/send-invite", () => {
    it("should send an invite successfully if no existing invitation and user is not registered", async () => {
      const targetEmail = `newuser-${Date.now()}@example.com`; // Use a unique email for this test

      // Verify a clean initial state for the target email using service methods
      const initialInvitation = await invitationService.getPending({
        senderId: marketerUser.id,
        email: targetEmail,
        role: EnumInvitationsRole.EMPLOYER,
      });
      const initialUser = await userService.get({ email: targetEmail });
      expect(initialInvitation).toBeNull();
      expect(initialUser).toBeNull();

      const response = await request(app)
        .post("/api/v1/marketer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`) // Authenticate the request as a marketer
        .send({ email: targetEmail });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toEqual("Invite sent and created");
      expect(response.body.data).toHaveProperty("id"); // Ensure the ID of the created invitation is returned

      // Verify the invitation was created in the database via the invitation service
      const createdInvitation = await invitationService.getPending({
        // Assuming get can take multiple filter criteria
        email: targetEmail,
        senderId: marketerUser.id,
        role: EnumInvitationsRole.EMPLOYER,
      });

      expect(createdInvitation).not.toBeNull();
      expect(createdInvitation?.targetEmail).toEqual(targetEmail);
      expect(createdInvitation?.senderUserId).toEqual(marketerUser.id);
      expect(createdInvitation?.role).toEqual(EnumUsersRole.EMPLOYER);
      expect(createdInvitation?.status).toEqual(EnumInvitationsStatus.pending);

      // Check that `expiresAt` is approximately 12 hours from now
      const expectedExpiresAtApprox = Date.now() + 12 * 60 * 60 * 1000;
      expect(createdInvitation?.expiresAt.getTime()).toBeCloseTo(
        expectedExpiresAtApprox,
        -1000, // Allow for 1 second variance
      );

      // Assert that the returned data matches the structure and content of the created invitation
      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: createdInvitation?.id, // Use the actual ID from the DB for comparison
          targetEmail: targetEmail,
          senderUserId: marketerUser.id,
          role: EnumUsersRole.EMPLOYER,
          status: EnumInvitationsStatus.pending,
        }),
      );
      const receivedExpiresAtMs = new Date(
        response.body.data.expiresAt,
      ).getTime();
      expect(receivedExpiresAtMs).toBeCloseTo(expectedExpiresAtApprox, -1000);
    });

    it("should return 400 if a pending invitation for the target user already exists", async () => {
      const targetEmail = `existing-${Date.now()}@example.com`; // Unique email for this scenario

      // Create an existing pending invitation directly using the invitation service
      await invitationService.create({
        email: targetEmail,
        senderId: marketerUser.id,
        role: EnumUsersRole.EMPLOYER,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
      });

      const response = await request(app)
        .post("/api/v1/marketer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ email: targetEmail });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toEqual(
        "Invitation for the target user already exists",
      );

      // Verify no new invitation was created (should still be only the initially created one)
      const allInvitations = await invitationService.getMany({
        senderId: marketerUser.id,
        email: targetEmail,
        role: EnumUsersRole.EMPLOYER,
      }); // Assuming getMany can filter
      expect(allInvitations.length).toEqual(1);
    });

    it("should return 400 if the invited user already exists", async () => {
      const targetEmail = `existinguser-${Date.now()}@example.com`; // Unique email for this scenario

      // Create an existing user directly in the database using userService
      await userService.create({
        email: targetEmail,
        password: "TestPassword123!", // Dummy password as it's not relevant for this test's focus
        role: EnumUsersRole.REGULAR_USER, // The specific role may not matter, just that the user exists
        username: `existingUser_${Date.now()}`, // Include username if required by schema
      });

      // Ensure no pending invitation exists for this user initially
      const initialInvitation = await invitationService.getPending({
        senderId: marketerUser.id,
        email: targetEmail,
      });
      expect(initialInvitation).toBeNull();

      const response = await request(app)
        .post("/api/v1/marketer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ email: targetEmail });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toEqual("Cannot invite an existing user");

      // Verify no invitation was created as the user already exists
      const createdInvitation = await invitationService.invitationExists({
        email: targetEmail,
      });
      expect(createdInvitation).toBe(false);
    });

    it("should return 400 with a generic error message if an invalid email format is provided", async () => {
      const invalidEmail = "not-an-email"; // This should trigger email format validation

      const response = await request(app)
        .post("/api/v1/marketer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`) // Authenticate to reach controller validation logic
        .send({ email: invalidEmail });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toEqual("Invalid email format");

      // Verify no invitation was created with this invalid email
      const createdInvitation = await invitationService.invitationExists({
        email: invalidEmail,
      });
      expect(createdInvitation).toBe(false);
    });

    it("should return 400 with generic error message if email is missing in request body", async () => {
      const response = await request(app)
        .post("/api/v1/marketer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`) // Authenticate
        .send({}); // Send an empty body, missing the 'email' field

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toEqual("Email field required");

      // No invitation should be created for this invalid request.
    });

    it("should return 401 if not authenticated", async () => {
      const targetEmail = `unauth-${Date.now()}@example.com`;
      const response = await request(app)
        .post("/api/v1/marketer/send-invite")
        .send({ email: targetEmail }); // Request made without an Authorization header

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("GET /api/v1/marketer/invites", () => {
    it("should retrieve all invitations sent by the marketer", async () => {
      // Seed the database with invitations: some sent by the authenticated marketerUser, some by others.
      const invitesToCreate = [
        {
          email: `marketerA-${Date.now()}@example.com`,
          status: EnumInvitationsStatus.pending,
          senderId: marketerUser.id, // Sent by the test marketer
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
        {
          email: `marketerB-${Date.now()}@example.com`,
          status: EnumInvitationsStatus.accepted,
          senderId: marketerUser.id, // Sent by the test marketer
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
        {
          email: `otherC-${Date.now()}@example.com`, // Sent by a different sender
          status: EnumInvitationsStatus.pending,
          senderId: anotherMarketerUser.id,
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
      ];
      // Create invitations using the invitation service
      for (const invite of invitesToCreate) {
        await invitationService.create(invite);
      }

      const response = await request(app)
        .get("/api/v1/marketer/invites")
        .set("Authorization", `Bearer ${accessToken}`); // Authenticate the request

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toEqual(
        "Invitations retrieved successfully",
      );

      // Expect only invitations sent by the authenticated marketerUser
      const expectedInvitations = invitesToCreate.filter(
        (invite) => invite.senderId === marketerUser.id,
      );

      // Verify the count and basic properties of returned invitations
      expect(response.body.data.length).toEqual(expectedInvitations.length);
      response.body.data.forEach((receivedInvite: any) => {
        const matchingExpected = expectedInvitations.find(
          (expected: any) => expected.email === receivedInvite.targetEmail,
        );
        expect(matchingExpected).not.toBeUndefined();
        expect(receivedInvite.senderUserId).toEqual(marketerUser.id);
        expect(receivedInvite.role).toEqual(matchingExpected?.role);
        expect(receivedInvite.status).toEqual(matchingExpected?.status);
        expect(receivedInvite).toHaveProperty("id");
        expect(receivedInvite).toHaveProperty("createdAt");
        expect(receivedInvite).toHaveProperty("updatedAt");
        // Compare `expiresAt` with a tolerance for potential time differences
        expect(new Date(receivedInvite.expiresAt).getTime()).toBeCloseTo(
          matchingExpected?.expiresAt.getTime() || 0,
          -1000,
        );
      });
    });

    it("should retrieve invitations filtered by status and sent by the marketer", async () => {
      // Seed the database with invitations including different statuses and senders
      const invitesToCreate = [
        {
          email: `marketerE-${Date.now()}@example.com`,
          status: EnumInvitationsStatus.pending,
          senderId: marketerUser.id,
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
        {
          email: `marketerF-${Date.now()}@example.com`,
          status: EnumInvitationsStatus.accepted,
          senderId: marketerUser.id,
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
        {
          email: `otherG-${Date.now()}@example.com`, // From another sender
          status: EnumInvitationsStatus.pending,
          senderId: anotherMarketerUser.id,
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
        {
          email: `otherH-${Date.now()}@example.com`, // From another sender, accepted
          status: EnumInvitationsStatus.accepted,
          senderId: anotherMarketerUser.id,
          role: EnumUsersRole.EMPLOYER,
          expiresAt: new Date(Date.now() + 100000),
        },
      ];
      for (const invite of invitesToCreate) {
        await invitationService.create(invite);
      }

      const response = await request(app)
        .get("/api/v1/marketer/invites?status=accepted") // Filter by 'accepted' status
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toEqual(
        "Invitations retrieved successfully",
      );

      // Expect only invitations sent by `marketerUser.id` AND with `status` ACCEPTED
      const expectedInvitations = invitesToCreate.filter(
        (invite) =>
          invite.senderId === marketerUser.id &&
          invite.status === EnumInvitationsStatus.accepted,
      );

      expect(response.body.data.length).toEqual(expectedInvitations.length);
      response.body.data.forEach((receivedInvite: any) => {
        const matchingExpected = expectedInvitations.find(
          (expected: any) => expected.email === receivedInvite.targetEmail,
        );
        expect(matchingExpected).not.toBeUndefined();
        expect(receivedInvite.senderUserId).toEqual(marketerUser.id);
        expect(receivedInvite.status).toEqual(EnumInvitationsStatus.accepted); // Explicitly check accepted status
        expect(receivedInvite.role).toEqual(matchingExpected?.role);
        expect(receivedInvite).toHaveProperty("id");
        expect(receivedInvite).toHaveProperty("createdAt");
        expect(receivedInvite).toHaveProperty("updatedAt");
        expect(new Date(receivedInvite.expiresAt).getTime()).toBeCloseTo(
          matchingExpected?.expiresAt.getTime() || 0,
          -1000,
        );
      });
    });

    it("should return 400 if an invalid status query parameter is provided (e.g., not a valid enum)", async () => {
      // Authenticate the request to ensure the validation logic in the controller is reached
      const response = await request(app)
        .get("/api/v1/marketer/invites?status=INVALID_STATUS")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toEqual(
        "An error occured while getting invites",
      );
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get("/api/v1/marketer/invites"); // Request made without an Authorization header

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });
});
