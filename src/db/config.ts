import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema"; // Import all schema for type inference

export const db = drizzle(process.env.DATABASE_URL!, { schema }); // Pass schema for type inference
