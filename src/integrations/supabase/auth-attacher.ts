import { supabase } from './client';

export async function attachSupabaseAuth(request?: unknown) {
  return supabase;
}
