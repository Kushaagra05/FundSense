import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Prevent supabase-js from reading and clearing auth tokens from URL hash
// which can remove navigation fragments used for in-page anchors.
export const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: { detectSessionInUrl: false },
});
