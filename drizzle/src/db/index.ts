import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "./schema"
/** 
 * Use a connection pool for better performance. 
 * This allows multiple simultaneous queries without creating new connections.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// Singleton logic for development (prevents connection exhaustion)
const globalForDrizzle = global as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
};

export const db = globalForDrizzle.db ?? drizzle(pool, { schema });

if (process.env.NODE_ENV !== 'production') {
  globalForDrizzle.db = db;
}
