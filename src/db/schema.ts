import {
  pgTable,
  varchar,
  unique,
  uuid,
  boolean,
  timestamp,
  foreignKey,
  serial,
  integer,
  text,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const enumAdvancesStatus = pgEnum("enum_advances_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "PAID",
  "REPAID",
  "DEFAULTED",
]);
export const enumDemoRequestsStatus = pgEnum("enum_demo_requests_status", [
  "PENDING",
  "CONTACTED",
  "SCHEDULED",
  "COMPLETED",
  "CANCELLED",
]);
export const enumEmployeesKycStage = pgEnum("enum_employees_kycStage", [
  "none",
  "level_1",
  "level_2",
  "full",
]);
export const enumEmployeesKycStatus = pgEnum("enum_employees_kycStatus", [
  "pending",
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "needs_info",
  "expired",
]);
export const enumInvitationsRole = pgEnum("enum_invitations_role", [
  "EMPLOYER",
  "EMPLOYEE",
]);
export const enumInvitationsStatus = pgEnum("enum_invitations_status", [
  "pending",
  "accepted",
  "rejected",
  "expired",
]);
export const enumLiquidityPoolTransactionType = pgEnum(
  "enum_liquidity_pool_transactionType",
  ["CONTRIBUTION", "WITHDRAWAL", "ADVANCE_FUNDING", "REPAYMENT"],
);
export const enumUsersRole = pgEnum("enum_users_role", [
  "ADMIN",
  "EMPLOYER",
  "EMPLOYEE",
  "MARKETER",
  "WEB3_USER",
]);

export const sequelizeMeta = pgTable("SequelizeMeta", {
  name: varchar({ length: 255 }).primaryKey().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`), // For PostgreSQL
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: enumUsersRole("role").default("WEB3_USER").notNull(),
    walletAddress: varchar("wallet_address", { length: 255 }),
    isActive: boolean("is_active").default(true).notNull(),
    isWalletVerified: boolean("is_wallet_verified").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("users_username_key").on(table.username),
    unique("users_email_key").on(table.email),
    unique("users_wallet_address_key").on(table.walletAddress),
  ],
);

export const marketers = pgTable(
  "marketers",
  {
    id: serial("id").primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    registrationDate: timestamp("registration_date", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "marketers_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    unique("marketers_user_id_key").on(table.userId),
  ],
);

export const employers = pgTable(
  "employers",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`), // For PostgreSQL
    userId: uuid("user_id").notNull(),
    marketerId: integer("marketer_id"),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    registrationDate: timestamp("registration_date", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    verificationDate: timestamp("verification_date", {
      withTimezone: true,
      mode: "date",
    }),
    verifiedBy: uuid("verified_by"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "employers_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.marketerId],
      foreignColumns: [marketers.id],
      name: "employers_marketer_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.verifiedBy],
      foreignColumns: [users.id],
      name: "employers_verified_by_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    unique("employers_user_id_key").on(table.userId),
  ],
);

export const employees = pgTable(
  "employees",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`), // For PostgreSQL
    userId: uuid("user_id").notNull(),
    employerId: uuid("employer_id").notNull(),
    kycStage: enumEmployeesKycStage("kyc_stage").default("none").notNull(),
    kycStatus: enumEmployeesKycStatus("kyc_status")
      .default("pending")
      .notNull(),
    kycSubmittedAt: timestamp("kyc_submitted_at", {
      withTimezone: true,
      mode: "date",
    }),
    kycReviewedAt: timestamp("kyc_reviewed_at", {
      withTimezone: true,
      mode: "date",
    }),
    kycReviewerId: uuid("kyc_reviewer_id"),
    kycNotes: text("kyc_notes"),
    salary: numeric("salary", { precision: 20, scale: 0 }),
    registrationDate: timestamp("registration_date", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "employees_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.employerId],
      foreignColumns: [employers.id],
      name: "employees_employer_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.kycReviewerId],
      foreignColumns: [users.id],
      name: "employees_kyc_reviewer_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    unique("employees_user_id_key").on(table.userId),
  ],
);

export const advances = pgTable(
  "advances",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`), // For PostgreSQL
    employeeId: uuid("employee_id").notNull(),
    amount: numeric("amount", { precision: 20, scale: 0 }).notNull(),
    repaymentAmount: numeric("repayment_amount", {
      precision: 20,
      scale: 0,
    }).notNull(),
    requestDate: timestamp("request_date", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    approvalDate: timestamp("approval_date", {
      withTimezone: true,
      mode: "date",
    }),
    paymentDate: timestamp("payment_date", {
      withTimezone: true,
      mode: "date",
    }),
    dueDate: timestamp("due_date", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    status: enumAdvancesStatus("status").default("PENDING").notNull(),
    transactionHash: varchar("transaction_hash", { length: 66 }),
    repaymentTransactionHash: varchar("repayment_transaction_hash", {
      length: 66,
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    foreignKey({
      columns: [table.employeeId],
      foreignColumns: [employees.id],
      name: "advances_employee_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const liquidityPool = pgTable(
  "liquidity_pool",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`), // For PostgreSQL
    employerId: uuid("employer_id").notNull(),
    amount: numeric("amount", { precision: 20, scale: 0 }).notNull(),
    transactionType:
      enumLiquidityPoolTransactionType("transaction_type").notNull(),
    transactionHash: varchar("transaction_hash", { length: 66 }).notNull(),
    timestamp: timestamp("timestamp", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    foreignKey({
      columns: [table.employerId],
      foreignColumns: [employers.id],
      name: "liquidity_pool_employer_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    unique("liquidity_pool_transaction_hash_key").on(table.transactionHash),
  ],
);

export const invitations = pgTable(
  "invitations",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`), // For PostgreSQL
    targetEmail: varchar("target_email", { length: 255 }).notNull(),
    senderUserId: uuid("sender_user_id").notNull(),
    recipientUserId: uuid("recipient_user_id"),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
    status: enumInvitationsStatus("status").default("pending").notNull(),
    role: enumInvitationsRole("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    foreignKey({
      columns: [table.senderUserId],
      foreignColumns: [users.id],
      name: "invitations_sender_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.recipientUserId],
      foreignColumns: [users.id],
      name: "invitations_recipient_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const demoRequests = pgTable(
  "demo_requests",
  {
    id: serial("id").primaryKey().notNull(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    contactName: varchar("contact_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    companySize: integer("company_size").notNull(),
    message: text("message"),
    status: enumDemoRequestsStatus("status").default("PENDING").notNull(),
    scheduledDate: timestamp("scheduled_date", {
      withTimezone: true,
      mode: "date",
    }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [unique("demo_requests_email_key").on(table.email)],
);
