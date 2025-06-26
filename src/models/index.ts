import { User } from "./User";
import { UserRole } from "../types";
import { Employer } from "./Employer";
import { Employee } from "./Employee";
import { Marketer } from "./Marketer";
import { Advance, AdvanceStatus } from "./Advance";
import { LiquidityPool, PoolTransactionType } from "./LiquidityPool";
import { Invitation } from "./Invitation";

// NOTE: Ensure foreign key types match the primary key types they reference.
// For example, foreign keys referencing User.id (UUID) or Employee.id (UUID)
// should use DataTypes.UUID, not DataTypes.INTEGER, to maintain data integrity.

/**
 * Model Associations in Sequelize (Low-Level Explanation)
 *
 * Associations define relationships between your database tables (models). At a low level,
 * they establish how data in one table relates to data in another through foreign keys.
 * Sequelize provides abstractions (hasOne, belongsTo, hasMany, belongsToMany) that simplify
 * defining and managing these relationships.
 *
 * 1. Foreign Keys: At the heart of every association is the foreign key. A foreign key is a column
 *    in one table that references the primary key of another table.  This constraint maintains referential
 *    integrity (you can't have a foreign key pointing to a non-existent primary key). When defining
 *    associations, always ensure the data types of the foreign key and the primary key it references match
 *    (e.g., both UUID or both INTEGER).
 *
 * 2. Association Types:
 *    - hasOne:  A 1-to-1 relationship.  Table A has one of Table B.  The foreign key lives in Table B.
 *       Example: User hasOne Employer (each user can be *one* employer). The `Employer` table will have `userId`.
 *    - belongsTo: The inverse of hasOne. Table A belongs to Table B. Table A contains the foreign key.
 *       Example: Employer belongsTo User (each employer *is* a user). The `Employer` table will have `userId`.
 *    - hasMany: A 1-to-N relationship. Table A has many of Table B. The foreign key lives in Table B.
 *       Example: Employer hasMany Employees (each employer can have *many* employees). The `Employee` table will have `employerId`.
 *    - belongsToMany: An N-to-N relationship. Table A belongs to many of Table B through a *junction table*.
 *       This junction table contains *both* foreign keys, one referencing Table A and the other Table B.
 *       (Not shown in this file, but Sequelize supports it).
 *
 * 3. How Associations Work (Under the Hood):
 *    - When you define an association, Sequelize automatically adds methods to your models
 *      (e.g., `getUser()`, `setUser()`, `getEmployees()`, `addEmployee()`) that you can use to
 *      easily query and manipulate related data.
 *    - Sequelize uses the foreign key to perform JOIN operations behind the scenes. When you call `employer.getEmployees()`,
 *      Sequelize constructs a SQL query that joins the `employers` table and the `employees` table based on the `employerId`
 *      foreign key.
 *
 * 4. Implementation Steps:
 *    a) Define your models (User, Employer, Employee, etc.) with their respective attributes (columns). Ensure your primary keys are defined.
 *    b) In each model, specify the foreign key column. The model *receiving* the association gets the foreign key.  For example, `Employee`
 *       needs an `employerId` column to associate it with `Employer`.
 *    c) Use the Sequelize association methods (`hasOne`, `belongsTo`, `hasMany`) to formally define the relationships between the models.
 *       Specify the `foreignKey` option to tell Sequelize which column contains the foreign key. Specify the `as` option to give the association
 *       a name, which is used for the automatically generated methods (e.g., `getEmployees()` if `as: 'employees'`).
 *    d) When querying data, use the automatically generated methods or eager loading (`include` option) to retrieve related data efficiently.
 *
 * 5. When to Use Which Association:
 *    - hasOne/belongsTo: Use when one record in a table is related to exactly one record in another table.  Choose `hasOne` on the table
 *      that doesn't have the foreign key, and `belongsTo` on the table *with* the foreign key.
 *    - hasMany: Use when one record in a table is related to multiple records in another table.
 *    - belongsToMany: Use when records in two tables can be related to each other in multiple ways (many-to-many).  Requires an intermediate junction table.
 *
 * 6. Important Considerations:
 *    - Data Types: Ensure foreign key types match the primary key types.
 *    - Model Names:  Sequelize uses model names to infer table names (pluralized and lowercased).  Make sure your model names are consistent.
 *    - Indexes:  Create indexes on foreign key columns to improve query performance.
 *    - onDelete/onUpdate:  Consider using `onDelete` and `onUpdate` options to define cascading behaviors (e.g., what happens when you delete a User that has related Employers).  This helps maintain data integrity.
 */

// One to one relationship between Employer and User
User.hasOne(Employer, {
  foreignKey: "userId",
  as: "employer",
});

Employer.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});
//--------------------------------------------------

Employer.belongsTo(Marketer, {
  foreignKey: "marketerId",
  as: "invitedBy",
});

Employer.hasMany(Employee, {
  foreignKey: "employerId",
  as: "employer",
});

Employer.hasMany(LiquidityPool, {
  foreignKey: "employerId",
  as: "poolTransactions",
});

// One to one relationship between Employee and User
User.hasOne(Employee, {
  foreignKey: "userId",
  as: "employee",
});

Employee.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
//--------------------------------------------------

Employee.hasMany(Advance, {
  foreignKey: "employeeId",
  as: "advances",
});

Employee.belongsTo(Employer, {
  foreignKey: "employerId",
  as: "employer",
});

Employee.belongsTo(User, {
  foreignKey: "kycReviewerId",
  as: "kycReviewer",
});

// One to one relationship for Marketer and User
User.hasOne(Marketer, {
  foreignKey: "userId",
  as: "marketer",
});

Marketer.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
Invitation.belongsTo(User, {
  foreignKey: "senderUserId",
  as: "sender",
});
Invitation.belongsTo(User, {
  foreignKey: "recipientUserId",
  as: "receiver",
});

Advance.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

LiquidityPool.belongsTo(Employer, {
  foreignKey: "employerId",
  as: "employer",
});

export {
  User,
  UserRole,
  Employer,
  Employee,
  Advance,
  AdvanceStatus,
  Invitation,
  LiquidityPool,
  PoolTransactionType,
  Marketer,
};
