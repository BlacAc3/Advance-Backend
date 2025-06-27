import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { alias } from "drizzle-orm/pg-core";
import { eq, and, SQL, Placeholder, InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference

type DbType = NodePgDatabase<typeof schema>;

class InvitationService {
  private invitations = schema.invitations;
  constructor(private db: DbType) {}
  schema = schema;

  async invitationExists(id: string): Promise<boolean> {
    const result = await this.db
      .select({ id: this.invitations.id })
      .from(this.invitations)
      .where(eq(this.invitations.id, id))
      .limit(1);

    return result.length > 0;
  }
  async get(data: { id: string }) {
    const { id } = data;

    const result = await this.db
      .select()
      .from(this.invitations)
      .where(eq(this.invitations.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  async getPending(data: { senderId: string; email: string }) {
    const { senderId, email: targetEmail } = data;
    const status = "pending";
    const whereClauses = [eq(this.invitations.id, senderId)];

    if (targetEmail) {
      whereClauses.push(eq(this.invitations.targetEmail, targetEmail));
    }

    if (status) {
      whereClauses.push(eq(this.invitations.status, status));
    }

    const result = await this.db
      .select()
      .from(this.invitations)
      .where(and(...whereClauses))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  async create(data: {
    email: string;
    senderId: string;
    role: "EMPLOYER" | "EMPLOYEE";
    expiresAt: Date;
  }) {
    const { email, senderId, role, expiresAt } = data;
    const [newInvitation] = await this.db
      .insert(this.invitations)
      .values({
        targetEmail: email,
        senderUserId: senderId,
        role: role,
        expiresAt: expiresAt,
      })
      .returning();

    return newInvitation;
  }

  async expire(id: string) {
    await this.db
      .update(this.invitations)
      .set({ status: "expired" })
      .where(eq(this.invitations.id, id));
  }

  async getAll(data?: {
    senderId?: string;
    email?: string;
    status?: "pending" | "accepted" | "rejected" | "expired";
  }) {
    const { senderId, email: targetEmail, status } = data || {};
    const whereClauses = [];

    if (senderId) {
      whereClauses.push(eq(this.invitations.senderUserId, senderId));
    }

    if (targetEmail) {
      whereClauses.push(eq(this.invitations.targetEmail, targetEmail));
    }

    if (status) {
      whereClauses.push(eq(this.invitations.status, status));
    }
    const senderUsers = alias(schema.users, "sender_users");
    const recipientUsers = alias(schema.users, "recipient_users");
    const invitations = await this.db
      .select({
        invitation: this.invitations,
        sender: senderUsers,
        recipient: recipientUsers,
      })
      .from(this.invitations)
      .leftJoin(senderUsers, eq(senderUsers.id, this.invitations.senderUserId))
      .leftJoin(
        recipientUsers,
        eq(recipientUsers.id, this.invitations.recipientUserId),
      )
      .where(and(...whereClauses));

    return invitations;
  }
}

const invitationService = new InvitationService(db);

export default invitationService;
