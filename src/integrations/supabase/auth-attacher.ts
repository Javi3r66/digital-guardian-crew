import { supabase } from './client';

export async function attachAuthHeader(request) {
  return supabase;
}
