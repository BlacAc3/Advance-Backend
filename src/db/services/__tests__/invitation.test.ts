import { PrismaClient } from "../../../generated/prisma";
import {
  EnumInvitationsRole,
  EnumInvitationsStatus,
} from "../../../generated/prisma";
import invitationService from "../invitation";

// Mock the dependencies
jest.mock("../../database", () => ({
  prisma: {
    invitation: {
      count: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

const { prisma } = require("../../database");

describe("InvitationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("invitationExists", () => {
    it("should return true when invitation exists by id", async () => {
      prisma.invitation.count.mockResolvedValue(1);

      const result = await invitationService.invitationExists({
        id: "invitation-id",
      });

      expect(prisma.invitation.count).toHaveBeenCalledWith({
        where: { id: "invitation-id" },
      });
      expect(result).toBe(true);
    });

    it("should return true when invitation exists by email", async () => {
      prisma.invitation.count.mockResolvedValue(1);

      const result = await invitationService.invitationExists({
        email: "test@example.com",
      });

      expect(prisma.invitation.count).toHaveBeenCalledWith({
        where: { targetEmail: "test@example.com" },
      });
      expect(result).toBe(true);
    });

    it("should return true when multiple invitations exist", async () => {
      prisma.invitation.count.mockResolvedValue(3);

      const result = await invitationService.invitationExists({
        email: "test@example.com",
      });

      expect(result).toBe(true);
    });

    it("should return false when invitation does not exist", async () => {
      prisma.invitation.count.mockResolvedValue(0);

      const result = await invitationService.invitationExists({
        id: "non-existent-id",
      });

      expect(result).toBe(false);
    });

    it("should return false when no criteria provided", async () => {
      const result = await invitationService.invitationExists({});

      expect(prisma.invitation.count).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it("should check both id and email when both provided", async () => {
      prisma.invitation.count.mockResolvedValue(1);

      const result = await invitationService.invitationExists({
        id: "invitation-id",
        email: "test@example.com",
      });

      expect(prisma.invitation.count).toHaveBeenCalledWith({
        where: {
          id: "invitation-id",
          targetEmail: "test@example.com",
        },
      });
      expect(result).toBe(true);
    });
  });

  describe("get", () => {
    const mockInvitation = {
      id: "invitation-id",
      targetEmail: "employee@example.com",
      senderUserId: "sender-id",
      recipientUserId: "recipient-id",
      role: EnumInvitationsRole.EMPLOYEE,
      status: EnumInvitationsStatus.pending,
      expiresAt: new Date("2024-12-31"),
      createdAt: new Date(),
      updatedAt: new Date(),
      senderUser: {
        id: "sender-id",
        email: "sender@example.com",
      },
      recipientUser: {
        id: "recipient-id",
        email: "recipient@example.com",
      },
    };

    it("should get invitation by id", async () => {
      prisma.invitation.findUnique.mockResolvedValue(mockInvitation);

      const result = await invitationService.get({ id: "invitation-id" });

      expect(prisma.invitation.findUnique).toHaveBeenCalledWith({
        where: { id: "invitation-id" },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockInvitation);
    });

    it("should return null when invitation not found", async () => {
      prisma.invitation.findUnique.mockResolvedValue(null);

      const result = await invitationService.get({ id: "non-existent-id" });

      expect(result).toBeNull();
    });
  });

  describe("getMany", () => {
    const mockInvitations = [
      {
        id: "invitation-1",
        targetEmail: "user1@example.com",
        senderUserId: "sender-1",
        role: EnumInvitationsRole.EMPLOYEE,
        status: EnumInvitationsStatus.pending,
        senderUser: { id: "sender-1", email: "sender1@example.com" },
        recipientUser: null,
      },
      {
        id: "invitation-2",
        targetEmail: "user2@example.com",
        senderUserId: "sender-1",
        role: EnumInvitationsRole.EMPLOYER,
        status: EnumInvitationsStatus.accepted,
        senderUser: { id: "sender-1", email: "sender1@example.com" },
        recipientUser: { id: "recipient-2", email: "user2@example.com" },
      },
    ];

    it("should get invitations with all filters", async () => {
      prisma.invitation.findMany.mockResolvedValue(mockInvitations);

      const result = await invitationService.getMany({
        senderId: "sender-1",
        recipientId: "recipient-2",
        email: "user2@example.com",
        role: EnumInvitationsRole.EMPLOYER,
        status: EnumInvitationsStatus.accepted,
      });

      expect(prisma.invitation.findMany).toHaveBeenCalledWith({
        where: {
          senderUserId: "sender-1",
          recipientUserId: "recipient-2",
          targetEmail: "user2@example.com",
          role: EnumInvitationsRole.EMPLOYER,
          status: EnumInvitationsStatus.accepted,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockInvitations);
    });

    it("should get invitations with partial filters", async () => {
      prisma.invitation.findMany.mockResolvedValue(mockInvitations);

      const result = await invitationService.getMany({
        senderId: "sender-1",
        status: EnumInvitationsStatus.pending,
      });

      expect(prisma.invitation.findMany).toHaveBeenCalledWith({
        where: {
          senderUserId: "sender-1",
          status: EnumInvitationsStatus.pending,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockInvitations);
    });

    it("should get all invitations when no filters provided", async () => {
      prisma.invitation.findMany.mockResolvedValue(mockInvitations);

      const result = await invitationService.getMany();

      expect(prisma.invitation.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockInvitations);
    });

    it("should return empty array when no invitations found", async () => {
      prisma.invitation.findMany.mockResolvedValue([]);

      const result = await invitationService.getMany({
        senderId: "no-invitations",
      });

      expect(result).toEqual([]);
    });
  });

  describe("getPending", () => {
    const mockPendingInvitation = {
      id: "pending-invitation",
      targetEmail: "pending@example.com",
      senderUserId: "sender-id",
      role: EnumInvitationsRole.EMPLOYEE,
      status: EnumInvitationsStatus.pending,
      senderUser: { id: "sender-id", email: "sender@example.com" },
      recipientUser: null,
    };

    it("should get pending invitation with all parameters", async () => {
      prisma.invitation.findFirst.mockResolvedValue(mockPendingInvitation);

      const result = await invitationService.getPending({
        senderId: "sender-id",
        email: "pending@example.com",
        role: EnumInvitationsRole.EMPLOYEE,
      });

      expect(prisma.invitation.findFirst).toHaveBeenCalledWith({
        where: {
          senderUserId: "sender-id",
          status: EnumInvitationsStatus.pending,
          targetEmail: "pending@example.com",
          role: EnumInvitationsRole.EMPLOYEE,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockPendingInvitation);
    });

    it("should get pending invitation without role", async () => {
      prisma.invitation.findFirst.mockResolvedValue(mockPendingInvitation);

      const result = await invitationService.getPending({
        senderId: "sender-id",
        email: "pending@example.com",
      });

      expect(prisma.invitation.findFirst).toHaveBeenCalledWith({
        where: {
          senderUserId: "sender-id",
          status: EnumInvitationsStatus.pending,
          targetEmail: "pending@example.com",
          role: undefined,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockPendingInvitation);
    });

    it("should return null when no pending invitation found", async () => {
      prisma.invitation.findFirst.mockResolvedValue(null);

      const result = await invitationService.getPending({
        senderId: "sender-id",
        email: "notfound@example.com",
      });

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should create invitation with all fields", async () => {
      const invitationData = {
        email: "new@example.com",
        senderId: "sender-id",
        role: EnumInvitationsRole.EMPLOYEE,
        expiresAt: new Date("2024-12-31"),
        status: EnumInvitationsStatus.pending,
      };

      const createdInvitation = {
        id: "new-invitation-id",
        targetEmail: invitationData.email,
        senderUserId: invitationData.senderId,
        role: invitationData.role,
        status: invitationData.status,
        expiresAt: invitationData.expiresAt,
        recipientUserId: null,
        senderUser: { id: "sender-id", email: "sender@example.com" },
        recipientUser: null,
      };

      prisma.invitation.create.mockResolvedValue(createdInvitation);

      const result = await invitationService.create(invitationData);

      expect(prisma.invitation.create).toHaveBeenCalledWith({
        data: {
          targetEmail: invitationData.email,
          senderUserId: invitationData.senderId,
          role: invitationData.role,
          expiresAt: invitationData.expiresAt,
          status: invitationData.status,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(createdInvitation);
    });

    it("should create invitation without status (defaults to pending)", async () => {
      const invitationData = {
        email: "new@example.com",
        senderId: "sender-id",
        role: EnumInvitationsRole.EMPLOYER,
        expiresAt: new Date("2024-12-31"),
      };

      const createdInvitation = {
        id: "new-invitation-id",
        targetEmail: invitationData.email,
        senderUserId: invitationData.senderId,
        role: invitationData.role,
        status: undefined,
        expiresAt: invitationData.expiresAt,
        senderUser: { id: "sender-id", email: "sender@example.com" },
        recipientUser: null,
      };

      prisma.invitation.create.mockResolvedValue(createdInvitation);

      const result = await invitationService.create(invitationData);

      expect(prisma.invitation.create).toHaveBeenCalledWith({
        data: {
          targetEmail: invitationData.email,
          senderUserId: invitationData.senderId,
          role: invitationData.role,
          expiresAt: invitationData.expiresAt,
          status: undefined,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(createdInvitation);
    });

    it("should handle unique constraint violation", async () => {
      const invitationData = {
        email: "existing@example.com",
        senderId: "sender-id",
        role: EnumInvitationsRole.EMPLOYEE,
        expiresAt: new Date(),
      };

      const error = new Error("Unique constraint violation");
      prisma.invitation.create.mockRejectedValue(error);

      await expect(invitationService.create(invitationData)).rejects.toThrow(
        "Unique constraint violation",
      );
    });
  });

  describe("accept", () => {
    it("should accept an invitation", async () => {
      const acceptedInvitation = {
        id: "invitation-id",
        targetEmail: "accepted@example.com",
        status: EnumInvitationsStatus.accepted,
        recipientUserId: "recipient-id",
        senderUser: { id: "sender-id", email: "sender@example.com" },
        recipientUser: { id: "recipient-id", email: "accepted@example.com" },
      };

      prisma.invitation.update.mockResolvedValue(acceptedInvitation);

      const result = await invitationService.accept(
        "invitation-id",
        "recipient-id",
      );

      expect(prisma.invitation.update).toHaveBeenCalledWith({
        where: { id: "invitation-id" },
        data: {
          status: EnumInvitationsStatus.accepted,
          recipientUserId: "recipient-id",
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(acceptedInvitation);
    });

    it("should throw error when invitation not found", async () => {
      const error = new Error("Invitation not found");
      prisma.invitation.update.mockRejectedValue(error);

      await expect(
        invitationService.accept("non-existent-id", "recipient-id"),
      ).rejects.toThrow("Invitation not found");
    });
  });

  describe("expire", () => {
    it("should expire an invitation", async () => {
      const expiredInvitation = {
        id: "invitation-id",
        targetEmail: "expired@example.com",
        status: EnumInvitationsStatus.expired,
        senderUser: { id: "sender-id", email: "sender@example.com" },
        recipientUser: null,
      };

      prisma.invitation.update.mockResolvedValue(expiredInvitation);

      const result = await invitationService.expire("invitation-id");

      expect(prisma.invitation.update).toHaveBeenCalledWith({
        where: { id: "invitation-id" },
        data: { status: EnumInvitationsStatus.expired },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(expiredInvitation);
    });
  });

  describe("reject", () => {
    it("should reject an invitation", async () => {
      const rejectedInvitation = {
        id: "invitation-id",
        targetEmail: "rejected@example.com",
        status: EnumInvitationsStatus.rejected,
        senderUser: { id: "sender-id", email: "sender@example.com" },
        recipientUser: null,
      };

      prisma.invitation.update.mockResolvedValue(rejectedInvitation);

      const result = await invitationService.reject("invitation-id");

      expect(prisma.invitation.update).toHaveBeenCalledWith({
        where: { id: "invitation-id" },
        data: { status: EnumInvitationsStatus.rejected },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(rejectedInvitation);
    });
  });

  describe("getAll", () => {
    const mockInvitations = [
      {
        id: "invitation-1",
        targetEmail: "user1@example.com",
        senderUserId: "sender-1",
        status: EnumInvitationsStatus.pending,
      },
      {
        id: "invitation-2",
        targetEmail: "user2@example.com",
        senderUserId: "sender-2",
        status: EnumInvitationsStatus.accepted,
      },
    ];

    it("should get all invitations with filters", async () => {
      prisma.invitation.findMany.mockResolvedValue(mockInvitations);

      const result = await invitationService.getAll({
        senderId: "sender-1",
        email: "user1@example.com",
        status: EnumInvitationsStatus.pending,
      });

      expect(prisma.invitation.findMany).toHaveBeenCalledWith({
        where: {
          senderUserId: "sender-1",
          targetEmail: "user1@example.com",
          status: EnumInvitationsStatus.pending,
        },
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockInvitations);
    });

    it("should get all invitations without filters", async () => {
      prisma.invitation.findMany.mockResolvedValue(mockInvitations);

      const result = await invitationService.getAll();

      expect(prisma.invitation.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          senderUser: true,
          recipientUser: true,
        },
      });
      expect(result).toEqual(mockInvitations);
    });

    it("should return empty array when no invitations found", async () => {
      prisma.invitation.findMany.mockResolvedValue([]);

      const result = await invitationService.getAll({
        senderId: "no-invitations",
      });

      expect(result).toEqual([]);
    });
  });

  describe("delete", () => {
    it("should delete an invitation", async () => {
      const deletedInvitation = {
        id: "invitation-id",
        targetEmail: "deleted@example.com",
      };

      prisma.invitation.delete.mockResolvedValue(deletedInvitation);

      const result = await invitationService.delete("invitation-id");

      expect(prisma.invitation.delete).toHaveBeenCalledWith({
        where: { id: "invitation-id" },
      });
      expect(result).toEqual(deletedInvitation);
    });

    it("should throw error when invitation not found", async () => {
      const error = new Error("Invitation not found");
      prisma.invitation.delete.mockRejectedValue(error);

      await expect(invitationService.delete("non-existent-id")).rejects.toThrow(
        "Invitation not found",
      );
    });
  });

  describe("deleteAll", () => {
    it("should delete all invitations", async () => {
      const deleteResult = { count: 5 };
      prisma.invitation.deleteMany.mockResolvedValue(deleteResult);

      const result = await invitationService.deleteAll();

      expect(prisma.invitation.deleteMany).toHaveBeenCalledWith({});
      expect(result).toEqual(deleteResult);
    });

    it("should return count 0 when no invitations to delete", async () => {
      const deleteResult = { count: 0 };
      prisma.invitation.deleteMany.mockResolvedValue(deleteResult);

      const result = await invitationService.deleteAll();

      expect(result).toEqual(deleteResult);
    });

    it("should handle database errors", async () => {
      const error = new Error("Database error");
      prisma.invitation.deleteMany.mockRejectedValue(error);

      await expect(invitationService.deleteAll()).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("error handling", () => {
    it("should handle database connection errors", async () => {
      const dbError = new Error("Database connection failed");
      prisma.invitation.findUnique.mockRejectedValue(dbError);

      await expect(invitationService.get({ id: "test-id" })).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should handle validation errors", async () => {
      const validationError = new Error("Invalid enum value");
      prisma.invitation.create.mockRejectedValue(validationError);

      await expect(
        invitationService.create({
          email: "test@example.com",
          senderId: "sender-id",
          role: "INVALID_ROLE" as any,
          expiresAt: new Date(),
        }),
      ).rejects.toThrow("Invalid enum value");
    });

    it("should handle transaction errors", async () => {
      const transactionError = new Error("Transaction failed");
      prisma.invitation.update.mockRejectedValue(transactionError);

      await expect(
        invitationService.accept("invitation-id", "recipient-id"),
      ).rejects.toThrow("Transaction failed");
    });
  });
});
