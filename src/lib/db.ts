import { Pool } from "pg";

/**
 * A single pg Pool, cached across hot-reloads and serverless invocations.
 * Reads `DATABASE_URL`. Returns null when no database is configured, so the
 * app runs fine locally without Postgres.
 */
const g = globalThis as unknown as { __cloveodePool?: Pool | null };

export function getPool(): Pool | null {
  if (g.__cloveodePool !== undefined) return g.__cloveodePool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    g.__cloveodePool = null;
    return null;
  }

  // Managed Postgres (Neon, Supabase, Vercel, …) needs SSL; local usually doesn't.
  const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(connectionString);
  g.__cloveodePool = new Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 10_000,
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
  });
  return g.__cloveodePool;
}

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

/**
 * Persist a contact enquiry. Best-effort: returns false (and logs) on any
 * failure so a database problem never blocks the visitor's submission.
 * Assumes the `contact_submissions` table exists (see db/schema.sql).
 */
export async function saveContactSubmission(v: ContactSubmission): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;
  try {
    await pool.query(
      `insert into contact_submissions (name, email, company, budget, message)
       values ($1, $2, $3, $4, $5)`,
      [v.name, v.email, v.company || null, v.budget || null, v.message],
    );
    return true;
  } catch (err) {
    console.error("[contact] failed to save submission to Postgres", err);
    return false;
  }
}
