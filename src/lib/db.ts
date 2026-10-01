import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * A single Supabase client, cached across hot-reloads and serverless
 * invocations. Reads `SUPABASE_URL` + `SUPABASE_ANON_KEY` (the publishable
 * key). Returns null when Supabase isn't configured, so the app still runs
 * locally without it.
 *
 * Writes go through an INSERT-only row-level-security policy, so the key can
 * add enquiries but can never read or modify stored data.
 */
const g = globalThis as unknown as { __cloveodeSupabase?: SupabaseClient | null };

export function getClient(): SupabaseClient | null {
  if (g.__cloveodeSupabase !== undefined) return g.__cloveodeSupabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    g.__cloveodeSupabase = null;
    return null;
  }

  g.__cloveodeSupabase = createClient(url, key, {
    auth: { persistSession: false },
  });
  return g.__cloveodeSupabase;
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
  const supabase = getClient();
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("contact_submissions").insert({
      name: v.name,
      email: v.email,
      company: v.company || null,
      budget: v.budget || null,
      message: v.message,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("[contact] failed to save submission to Supabase", err);
    return false;
  }
}
