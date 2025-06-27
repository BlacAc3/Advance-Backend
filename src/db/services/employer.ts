import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, SQL, Placeholder, InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference

type DbType = NodePgDatabase<typeof schema>;

class EmployerService {
  constructor(private db: DbType) {}
  private employers = schema.employers;

  async get(data: { id?: string; companyName?: string }) {
    const { id, companyName } = data;
    if (!id && !companyName) {
      throw new Error("Either id or companyName must be provided");
    }

    let whereClause: SQL<unknown> | undefined;

    if (id) {
      whereClause = eq(this.employers.id, id);
    } else if (companyName) {
      whereClause = eq(this.employers.companyName, companyName);
    }

    const result = await this.db
      .select()
      .from(this.employers)
      .where(whereClause)
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }
}

const employerService = new EmployerService(db);
export default employerService;
