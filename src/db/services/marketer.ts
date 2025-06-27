import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, SQL, Placeholder, InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference

type DbType = NodePgDatabase<typeof schema>;
class MarketerService {
  private marketers = schema.marketers;
  constructor(private db: DbType) {}
  schema = schema;

  async get(data: { id?: number; userId?: string }) {
    const { id, userId } = data;
    const whereClauses = [];

    if (id) {
      whereClauses.push(eq(this.marketers.id, id));
    }

    if (userId) {
      whereClauses.push(eq(this.marketers.userId, userId));
    }

    if (whereClauses.length === 0) {
      throw new Error("Either id or userId must be provided");
    }

    const [result] = await this.db
      .select()
      .from(this.marketers)
      .where(and(...whereClauses))
      .limit(1);

    return result;
  }

  async create(data: { userId: string; registrationDate: Date }) {
    const { userId, registrationDate } = data;

    const [newMarketer] = await this.db
      .insert(this.marketers)
      .values({ userId, registrationDate })
      .returning();

    return newMarketer;
  }
}
const marketerService = new MarketerService(db);

export default marketerService;
