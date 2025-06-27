import { relations } from "drizzle-orm/relations";
import {
  users,
  marketers,
  employers,
  employees,
  advances,
  liquidityPool,
  invitations,
} from "./schema";

export const marketersRelations = relations(marketers, ({ one, many }) => ({
  user: one(users, {
    fields: [marketers.userId],
    references: [users.id],
  }),
  employers: many(employers),
}));

export const usersRelations = relations(users, ({ many }) => ({
  marketers: many(marketers),
  employers_userId: many(employers, {
    relationName: "employers_userId_users_id",
  }),
  employers_verifiedBy: many(employers, {
    relationName: "employers_verifiedBy_users_id",
  }),
  employees_userId: many(employees, {
    relationName: "employees_userId_users_id",
  }),
  employees_kycReviewerId: many(employees, {
    relationName: "employees_kycReviewerId_users_id",
  }),
  invitations_senderUserId: many(invitations, {
    relationName: "invitations_senderUserId_users_id",
  }),
  invitations_recipientUserId: many(invitations, {
    relationName: "invitations_recipientUserId_users_id",
  }),
}));

export const employersRelations = relations(employers, ({ one, many }) => ({
  user_userId: one(users, {
    fields: [employers.userId],
    references: [users.id],
    relationName: "employers_userId_users_id",
  }),
  marketer: one(marketers, {
    fields: [employers.marketerId],
    references: [marketers.id],
  }),
  user_verifiedBy: one(users, {
    fields: [employers.verifiedBy],
    references: [users.id],
    relationName: "employers_verifiedBy_users_id",
  }),
  employees: many(employees),
  liquidityPools: many(liquidityPool),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  user_userId: one(users, {
    fields: [employees.userId],
    references: [users.id],
    relationName: "employees_userId_users_id",
  }),
  employer: one(employers, {
    fields: [employees.employerId],
    references: [employers.id],
  }),
  user_kycReviewerId: one(users, {
    fields: [employees.kycReviewerId],
    references: [users.id],
    relationName: "employees_kycReviewerId_users_id",
  }),
  advances: many(advances),
}));

export const advancesRelations = relations(advances, ({ one }) => ({
  employee: one(employees, {
    fields: [advances.employeeId],
    references: [employees.id],
  }),
}));

export const liquidityPoolRelations = relations(liquidityPool, ({ one }) => ({
  employer: one(employers, {
    fields: [liquidityPool.employerId],
    references: [employers.id],
  }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  user_senderUserId: one(users, {
    fields: [invitations.senderUserId],
    references: [users.id],
    relationName: "invitations_senderUserId_users_id",
  }),
  user_recipientUserId: one(users, {
    fields: [invitations.recipientUserId],
    references: [users.id],
    relationName: "invitations_recipientUserId_users_id",
  }),
}));
