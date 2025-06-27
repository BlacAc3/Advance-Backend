import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  users,
  invitations,
  employers,
  marketers,
  enumUsersRole,
  enumInvitationsRole,
  enumInvitationsStatus,
} from "./schema";
import { eq, and, SQL, Placeholder } from "drizzle-orm";

import * as schema from "./schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference

/**
 * Checks if an invitation exists by its ID.
 * @param id The UUID of the invitation.
 * @returns A boolean indicating whether the invitation exists.
 */
export async function invitationExists(id: string): Promise<boolean> {
  const result = await db
    .select({ id: invitations.id })
    .from(invitations)
    .where(eq(invitations.id, id))
    .limit(1);

  return result.length > 0;
}

/**
 * Retrieves an invitation by its ID.
 * @param id The UUID of the invitation.
 * @returns The invitation object if found, otherwise null.
 */
export async function getInvitationById(id: string) {
  const result = await db
    .select()
    .from(invitations)
    .where(eq(invitations.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Retrieves a user by email.
 * @param email The email of the user.
 * @returns The user object if found, otherwise null.
 */
export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Retrieves a pending employer invitation by ID.
 * @param id The UUID of the invitation.
 * @returns The invitation object if found and matches criteria, otherwise null.
 */
export async function getPendingEmployerInvitationById(id: string) {
  const result = await db
    .select()
    .from(invitations)
    .where(
      and(
        eq(invitations.id, id),
        eq(invitations.role, "EMPLOYER"), // Use literal string from enum
        eq(invitations.status, "pending"), // Use literal string from enum
      ),
    )
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Expires an invitation by ID.
 * @param id The UUID of the invitation.
 */
export async function expireInvitation(id: string) {
  await db
    .update(invitations)
    .set({ status: "expired" }) // Use literal string from enum
    .where(eq(invitations.id, id));
}

/**
 * Retrieves an employer by company name.
 * @param companyName The company name.
 * @returns The employer object if found, otherwise null.
 */
export async function getEmployerByCompanyName(companyName: string) {
  const result = await db
    .select()
    .from(employers)
    .where(eq(employers.companyName, companyName))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Creates a new user.
 * @param userData The data for the new user. Should not include generated fields like id, createdAt, updatedAt.
 * @returns The created user object.
 */
export async function createUser(
  email: string | SQL<unknown> | Placeholder<string, any>,
  password: string | SQL<unknown> | Placeholder<string, any>,
  role:
    | (typeof enumUsersRole.enumValues)[number]
    | SQL<unknown>
    | Placeholder<string, any>,
  username?: string | SQL<unknown> | Placeholder<string, any>,
  walletAddress?: string | SQL<unknown> | Placeholder<string, any>,
) {
  // Drizzle handles defaults (like isActive, isWalletVerified, default role) and generated fields (id, timestamps).
  // Provide only the fields you intend to set.
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      password, // Note: Password should ideally be hashed before being passed here
      role,
      username,
      walletAddress,
      // Drizzle will set defaults for isActive, isWalletVerified, createdAt, updatedAt
    })
    .returning();

  return newUser;
}
