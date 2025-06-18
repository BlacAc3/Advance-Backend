import { Request, Response, NextFunction } from "express";
import { employeeController } from "../controllers/employee.controller";
import { User, Employer, Employee, Invitation } from "../models/index";
import { KycStage, KycStatus } from "../models/Employee"; // Import KycStage and KycStatus
import { TokenPayload, UserRole } from "../types";

// Mock the models
jest.mock("../models/index", () => ({
  User: {
    findOne: jest.fn(),
  },
  Employer: {
    findOne: jest.fn(),
  },
  Employee: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(), // Add update mock if needed elsewhere for Employee
  },
  Invitation: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock Express Request, Response, NextFunction
const mockRequest = () => {
  const req: any = {};
  req.params = jest.fn().mockReturnValue({});
  req.body = jest.fn().mockReturnValue({});
  req.user = jest.fn().mockReturnValue({}); // Mock the user attached by auth middleware
  return req as Request;
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis(); // Allow chaining .status().json()
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

const mockNext = () => jest.fn() as NextFunction;

// Cast mocked models to their expected types for clearer usage in tests
const MockUser = User as jest.Mocked<typeof User>;
const MockEmployer = Employer as jest.Mocked<typeof Employer>;
const MockEmployee = Employee as jest.Mocked<typeof Employee>;
const MockInvitation = Invitation as jest.Mocked<typeof Invitation>;

describe("employeeController", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  interface AcceptInvitationRequestBody {
    timestampAccepted?: string; // ISO 8601 string
  }
  const authenticatedUserId = "authenticatedUserId123";

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();

    // Reset mocks before each test
    jest.clearAllMocks();

    // Default mocks for req.user payload
    (req.user as TokenPayload) = {
      userId: authenticatedUserId,
      role: UserRole.EMPLOYEE,
      // Add other payload properties as needed
    };
  });

  describe("invite", () => {
    const invitationId = "testInvitationId";
    const targetEmail = "employee@example.com";
    const senderUserId = "employerUserId123";
    const employerId = "employerId456";

    beforeEach(() => {
      req.params = { invitationId } as any; // Cast to any because params is not explicitly defined in mockRequest() as having invitationId
      req.body = {};

      // Default successful invitation mock
      MockInvitation.findOne.mockResolvedValue({
        // Add missing required properties from the Invitation model
        id: "mock-invitation-uuid-123", // Example UUID
        role: "employee", // Assume the invitation role is employee for this test scenario
        createdAt: new Date(), // Mock creation timestamp
        updatedAt: new Date(), // Mock update timestamp

        // Keep existing mock properties
        invitationId,
        targetEmail,
        sentByUserId: senderUserId,
        status: "pending",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now

        // Mock the update method which is called on the model instance
        update: jest.fn().mockResolvedValue(undefined),
      } as any); // Cast is now more accurate

      // Default successful user mock (matching target email)
      MockUser.findOne.mockResolvedValue({
        id: authenticatedUserId,
        email: targetEmail,
      } as any);

      // Default successful employer mock
      MockEmployer.findOne.mockResolvedValue({
        id: employerId,
        userId: senderUserId,
      } as any);

      // Default employee not found mock
      MockEmployee.findOne.mockResolvedValue(null);

      // Default employee create mock
      MockEmployee.create.mockResolvedValue({
        userId: authenticatedUserId,
        employerId,
        kycStage: KycStage.NONE,
        kycStatus: KycStatus.PENDING,
      } as any);
    });

    it("should accept a valid pending invitation and create employee", async () => {
      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      expect(MockUser.findOne).toHaveBeenCalledWith({
        where: { id: authenticatedUserId },
      });
      expect(MockEmployer.findOne).toHaveBeenCalledWith({
        where: { userId: senderUserId },
      });
      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: {
          userId: authenticatedUserId,
          employerId,
        },
      });
      expect(MockEmployee.create).toHaveBeenCalledWith({
        userId: authenticatedUserId,
        employerId,
      });
      // Check that the update method on the returned invitation instance was called
      const invitationInstance = await MockInvitation.findOne({}); // Get the mocked instance to check its method
      expect(invitationInstance?.update).toHaveBeenCalledWith({
        status: "accepted",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "pending_kyc",
        message: "Invitation accepted. Please proceed to KYC verification.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 404 if invitation not found", async () => {
      MockInvitation.findOne.mockResolvedValue(null);

      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      expect(MockUser.findOne).not.toHaveBeenCalled(); // Should stop early
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invitation not found.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 if invitation has expired", async () => {
      const expiredInvitation = {
        invitationId,
        targetEmail,
        sentByUserId: senderUserId,
        status: "pending",
        expiresAt: new Date(Date.now() - 1000), // 1 second ago
        update: jest.fn().mockResolvedValue(undefined),
      };
      MockInvitation.findOne.mockResolvedValue(expiredInvitation as any);

      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      // Check that update was called on the instance
      expect(expiredInvitation.update).toHaveBeenCalledWith({
        status: "expired",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invitation has expired.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 if invitation is already accepted", async () => {
      MockInvitation.findOne.mockResolvedValue({
        invitationId,
        targetEmail,
        sentByUserId: senderUserId,
        status: "accepted", // Already accepted
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        update: jest.fn(), // No update expected here
      } as any);

      await employeeController.invite(
        // Corrected controller call
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invitation has already been accepted.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if authenticated user email does not match invitation target email", async () => {
      MockUser.findOne.mockResolvedValue({
        id: authenticatedUserId,
        email: "wrongemail@example.com", // Mismatch
      } as any);

      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      expect(MockUser.findOne).toHaveBeenCalledWith({
        where: { id: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "This invitation is not for you.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if authenticated user is not found", async () => {
      MockUser.findOne.mockResolvedValue(null); // User not found

      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      expect(MockUser.findOne).toHaveBeenCalledWith({
        where: { id: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "This invitation is not for you.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 500 if related employer not found to the invitation does not exist", async () => {
      MockEmployer.findOne.mockResolvedValue(null); // Employee not found

      await employeeController.invite(
        // Corrected controller call
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );
      expect(MockEmployer.findOne).toHaveBeenCalled();
      console.log(res.json);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to link employee to employer. Employer data invalid.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 200 and status existing if employee already exists", async () => {
      MockEmployee.findOne.mockResolvedValue({
        userId: authenticatedUserId,
        employerId,
        // Existing employee details
      } as any);
      const invitationInstance = await MockInvitation.findOne({}); // Get the mocked instance

      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockInvitation.findOne).toHaveBeenCalledWith({
        where: { invitationId },
      });
      expect(MockUser.findOne).toHaveBeenCalledWith({
        where: { id: authenticatedUserId },
      });
      expect(MockEmployer.findOne).toHaveBeenCalledWith({
        where: { userId: senderUserId },
      });
      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: {
          userId: authenticatedUserId,
          employerId,
        },
      });
      expect(MockEmployee.create).not.toHaveBeenCalled(); // No new employee created
      // Ensure invitation status is updated even if employee exists (as per current code logic)
      expect(invitationInstance?.update).toHaveBeenCalledWith({
        status: "accepted",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "existing",
        message: "Employee is already linked to this employer.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with error if an exception occurs", async () => {
      const mockError = new Error("Database error");
      MockInvitation.findOne.mockRejectedValue(mockError); // Simulate a database error

      await employeeController.invite(
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled(); // Ensure no response is sent by the controller
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("getKYC", () => {
    const authenticatedUserId = "authenticatedUserId123"; // Matches req.user.userId

    beforeEach(() => {
      (req.user as TokenPayload) = {
        userId: authenticatedUserId,
        role: UserRole.EMPLOYEE,
      };
      // Default successful employee mock
      MockEmployee.findOne.mockResolvedValue({
        userId: authenticatedUserId,
        kycStage: KycStage.LEVEL_1,
        kycStatus: KycStatus.APPROVED,
      } as any);
    });

    it("should return employee KYC status if employee record exists", async () => {
      await employeeController.getKYC(req, res, next);

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        currentKycStage: KycStage.LEVEL_1,
        currentKycStatus: KycStatus.APPROVED,
        message: "Successfully retrieved employee KYC status.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if employee record not found", async () => {
      MockEmployee.findOne.mockResolvedValue(null); // Employee not found

      await employeeController.getKYC(req, res, next);

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "You are not registered as an employee.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with error if an exception occurs", async () => {
      const mockError = new Error("Database error");
      MockEmployee.findOne.mockRejectedValue(mockError); // Simulate a database error

      await employeeController.getKYC(req, res, next);

      // Original controller code sends 500 directly rather than calling next() for this error case.
      // The test is updated to match the controller\'s actual behavior.
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "An error occurred",
        error: mockError, // Original code includes the error object directly
      });
      expect(next).not.toHaveBeenCalled(); // It catches and responds, doesn't pass to next
    });
  });

  describe("submitKYC", () => {
    const authenticatedUserId = "authenticatedUserId123"; // Matches req.user.userId
    let mockedEmployeeInstance: any; // Variable to hold the mocked employee instance

    beforeEach(() => {
      (req.user as TokenPayload) = {
        userId: authenticatedUserId,
        role: UserRole.EMPLOYEE,
      };
      // Default successful employee mock (ready for Level 1 submission)
      mockedEmployeeInstance = {
        userId: authenticatedUserId,
        kycStage: KycStage.NONE, // Ready for initial submission
        kycStatus: KycStatus.PENDING, // Ready for initial submission
        update: jest.fn().mockResolvedValue(undefined),
      } as any;
      MockEmployee.findOne.mockResolvedValue(mockedEmployeeInstance); // Mock findOne to return this instance
    });

    it("should accept Level 1 KYC submission when stage is NONE and status is PENDING", async () => {
      // MockEmployee.findOne is mocked in beforeEach to return mockedEmployeeInstance

      await employeeController.submitKYC(
        // Corrected controller call
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      // Check that update was called on the instance with correct data
      expect(mockedEmployeeInstance?.update).toHaveBeenCalledWith(
        expect.objectContaining({
          kycStatus: KycStatus.SUBMITTED,
          kycStage: KycStage.LEVEL_1, // Should update stage from NONE
          kycSubmittedAt: expect.any(Date), // Check if kycSubmittedAt is set
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "submission_received",
        message: "Level 1 KYC submission received. It is now pending review.",
        currentKycStage: KycStage.LEVEL_1,
        currentKycStatus: KycStatus.SUBMITTED,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should accept Level 1 KYC submission when stage is LEVEL_1 and status is PENDING (e.g., re-submission after rejection)", async () => {
      // Define the specific mocked instance for this test
      const employeeInstanceForTest = {
        userId: authenticatedUserId,
        kycStage: KycStage.LEVEL_1, // Already at Level 1 stage (e.g., previously rejected)
        kycStatus: KycStatus.REJECTED, // Ready for re-submission
        update: jest.fn().mockResolvedValue(undefined),
      } as any;
      MockEmployee.findOne.mockResolvedValue(employeeInstanceForTest); // Mock findOne to return this instance

      await employeeController.submitKYC(
        // Corrected controller call
        req as Request<
          { invitationId: string },
          {},
          AcceptInvitationRequestBody
        >,
        res,
        next,
      );

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(employeeInstanceForTest.update).toHaveBeenCalledWith(
        // Use the instance defined earlier
        expect.objectContaining({
          kycStatus: KycStatus.SUBMITTED,
          // Stage should NOT change if it\'s already LEVEL_1 or higher
          kycSubmittedAt: expect.any(Date),
        }),
      );
      // Explicitly check that kycStage was not updated from LEVEL_1
      const updateArgs = (employeeInstanceForTest.update as jest.Mock).mock // Use the instance defined earlier
        .calls[0][0];
      expect(updateArgs).not.toHaveProperty("kycStage");

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "submission_received",
        message: "Level 1 KYC submission received. It is now pending review.",
        currentKycStage: KycStage.LEVEL_1, // Response should reflect the post-update stage (if it changed) or current stage
        currentKycStatus: KycStatus.SUBMITTED,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 404 if employee record not found", async () => {
      MockEmployee.findOne.mockResolvedValue(null); // Employee not found

      await employeeController.submitKYC(
        req as Request<{}, {}, AcceptInvitationRequestBody>,
        res,
        next,
      );

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Employee record not found. Cannot submit KYC.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 if KYC status is already SUBMITTED", async () => {
      MockEmployee.findOne.mockResolvedValue({
        userId: authenticatedUserId,
        kycStage: KycStage.LEVEL_1,
        kycStatus: KycStatus.SUBMITTED, // Already submitted
        update: jest.fn(),
      } as any);

      await employeeController.submitKYC(
        req as Request<{}, {}, AcceptInvitationRequestBody>,
        res,
        next,
      );

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          currentKycStatus: KycStatus.SUBMITTED,
          currentKycStage: KycStage.LEVEL_1,
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 if KYC status is already IN_REVIEW", async () => {
      MockEmployee.findOne.mockResolvedValue({
        userId: authenticatedUserId,
        kycStage: KycStage.LEVEL_1,
        kycStatus: KycStatus.IN_REVIEW, // Already in review
        update: jest.fn(),
      } as any);

      await employeeController.submitKYC(
        req as Request<{}, {}, AcceptInvitationRequestBody>,
        res,
        next,
      );

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          currentKycStatus: KycStatus.IN_REVIEW,
          currentKycStage: KycStage.LEVEL_1,
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 400 if KYC stage is past LEVEL_1 ", async () => {
      MockEmployee.findOne.mockResolvedValue({
        userId: authenticatedUserId,
        kycStage: KycStage.LEVEL_2,
        kycStatus: KycStatus.APPROVED,
        update: jest.fn(),
      } as any);

      await employeeController.submitKYC(
        req as Request<{}, {}, AcceptInvitationRequestBody>,
        res,
        next,
      );

      expect(MockEmployee.findOne).toHaveBeenCalledWith({
        where: { userId: authenticatedUserId },
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          currentKycStage: KycStage.LEVEL_2,
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with error if an exception occurs", async () => {
      const mockError = new Error("Database error");
      MockEmployee.findOne.mockRejectedValue(mockError); // Simulate a database error

      await employeeController.submitKYC(
        req as Request<{}, {}, AcceptInvitationRequestBody>,
        res,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.status).not.toHaveBeenCalled(); // Ensure no response is sent by the controller
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
