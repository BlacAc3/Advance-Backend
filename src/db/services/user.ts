import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { hashPassword } from "../../utils/password";
import { eq, and, SQL, Placeholder, InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference

type DbType = NodePgDatabase<typeof schema>;

class UserService {
  private user = schema.users;
  constructor(private db: DbType) {}

  async get(data: { id?: string; email?: string; walletAddress?: string }) {
    const { id, email, walletAddress } = data;
    const whereClauses = [];

    if (id) {
      whereClauses.push(eq(this.user.id, id));
    } else if (email) {
      whereClauses.push(eq(this.user.email, email));
    } else if (walletAddress) {
      whereClauses.push(eq(this.user.walletAddress, walletAddress));
    } else {
      return null;
    }

    const [result] = await this.db
      .select()
      .from(this.user)
      .where(and(...whereClauses))
      .limit(1);

    return result;
  }

  async create(
    data: Omit<
      InferInsertModel<typeof schema.users>,
      "id" | "createdAt" | "updatedAt" | "isActive" | "isWalletVerified"
    >,
  ) {
    const { password, ...rest } = data;
    const hashedPassword = await hashPassword(password);
    const [newUser] = await this.db
      .insert(this.user)
      .values({ ...rest, password: hashedPassword })
      .returning();

    return newUser;
  }
}
const userService = new UserService(db);

export default userService;
