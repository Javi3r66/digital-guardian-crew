import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
  import.meta.env?.VITE_SUPABASE_URL ||
  'https://gsjgylomutnburmzrmmd.supabase.co';

const supabaseAnonKey = 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_BE3OnBe-y_k_QNuYy2eDsw_9NH1KuPE';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
