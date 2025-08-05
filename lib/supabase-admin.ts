// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // mesma URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // service-role key (privado)
  { auth: { persistSession: false } } // opcional: não guardar sessão
);
