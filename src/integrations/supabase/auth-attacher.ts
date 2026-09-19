import { supabase } from './client';

export async function attachAuthHeader(request?: unknown) {
  return supabase;
}
