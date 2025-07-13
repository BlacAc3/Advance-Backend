import "dotenv/config";
import { prisma } from "../database";
import {
  EnumInvitationsRole,
  EnumInvitationsStatus,
} from "../../generated/prisma";

class InvitationService {
  async invitationExists(data: {
    id?: string;
    email?: string;
  }): Promise<boolean> {
    const where: any = {};
    if (data.id) {
      where.id = data.id;
    }
    if (data.email) {
      where.targetEmail = data.email;
    }

    // If no criteria are provided, it's not a meaningful existence check
    if (Object.keys(where).length === 0) {
      return false;
    }

    const count = await prisma.invitation.count({
      where: where,
    });
    return count > 0;
  }

  async get(data: { id: string }) {
    return await prisma.invitation.findUnique({
      where: { id: data.id },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }
  async getMany(data?: {
    senderId?: string;
    recipientId?: string;
    email?: string;
    role?: EnumInvitationsRole;
    status?: EnumInvitationsStatus;
  }) {
    const {
      senderId,
      recipientId,
      email: targetEmail,
      role,
      status,
    } = data || {};
    const where: any = {};

    if (senderId) {
      where.senderUserId = senderId;
    }

    if (recipientId) {
      where.recipientUserId = recipientId;
    }

    if (targetEmail) {
      where.targetEmail = targetEmail;
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    return await prisma.invitation.findMany({
      where,
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async getPending(data: {
    senderId: string;
    email: string;
    role?: EnumInvitationsRole;
  }) {
    const { senderId, email: targetEmail, role } = data;

    return await prisma.invitation.findFirst({
      where: {
        senderUserId: senderId,
        status: EnumInvitationsStatus.pending,
        targetEmail: targetEmail,
        role: role,
      },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async create(data: {
    email: string;
    senderId: string;
    role: EnumInvitationsRole;
    expiresAt: Date;
    status?: EnumInvitationsStatus;
  }) {
    const { email, senderId, status, role, expiresAt } = data;

    return await prisma.invitation.create({
      data: {
        targetEmail: email,
        senderUserId: senderId,
        role: role,
        expiresAt: expiresAt,
        status: status,
      },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async accept(id: string, recipientId: string) {
    return await prisma.invitation.update({
      where: { id },
      data: {
        status: EnumInvitationsStatus.accepted,
        recipientUserId: recipientId,
      },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async expire(id: string) {
    return await prisma.invitation.update({
      where: { id },
      data: { status: EnumInvitationsStatus.expired },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async reject(id: string) {
    return await prisma.invitation.update({
      where: { id },
      data: { status: EnumInvitationsStatus.rejected },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async getAll(data?: {
    senderId?: string;
    email?: string;
    status?: EnumInvitationsStatus;
  }) {
    const { senderId, email: targetEmail, status } = data || {};
    const where: any = {};

    if (senderId) {
      where.senderUserId = senderId;
    }

    if (targetEmail) {
      where.targetEmail = targetEmail;
    }

    if (status) {
      where.status = status;
    }

    return await prisma.invitation.findMany({
      where,
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.invitation.delete({
      where: { id },
    });
  }

  async deleteAll() {
    return await prisma.invitation.deleteMany({});
  }
}

const invitationService = new InvitationService();

export default invitationService;
