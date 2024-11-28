import { createClient } from "@supabase/supabase-js";

// Use the correct environment variable names with the NEXT_PUBLIC_ prefix
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL and Key are required.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
