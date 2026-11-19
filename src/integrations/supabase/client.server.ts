import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env?.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env?.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseServer = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
