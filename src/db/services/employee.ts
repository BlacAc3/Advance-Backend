import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, SQL, Placeholder, InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference

type DbType = NodePgDatabase<typeof schema>;

class EmployeeService {
  constructor(private db: DbType) {}
  private employees = schema.employees;

  async get(data: { id?: string; userId?: string }) {
    const { id, userId } = data;
    const whereClauses = [];

    if (id) {
      whereClauses.push(eq(this.employees.id, id));
    } else if (userId) {
      whereClauses.push(eq(this.employees.userId, userId));
    } else {
      throw new Error("Either id or userId must be provided");
    }

    const [result] = await this.db
      .select()
      .from(this.employees)
      .where(and(...whereClauses))
      .limit(1);

    return result;
  }

  async create(
    data: Omit<
      InferInsertModel<typeof schema.employees>,
      "id" | "createdAt" | "updatedAt"
    >,
  ) {
    const [newEmployee] = await this.db
      .insert(this.employees)
      .values(data)
      .returning();

    return newEmployee;
  }

  async update(
    id: string,
    data: Partial<
      Omit<
        InferInsertModel<typeof schema.employees>,
        "id" | "createdAt" | "updatedAt" | "userId" | "employerId"
      >
    >,
  ) {
    const [updatedEmployee] = await this.db
      .update(this.employees)
      .set(data)
      .where(eq(this.employees.id, id))
      .returning();

    return updatedEmployee;
  }
}

const employeeService = new EmployeeService(db);
export default employeeService;
