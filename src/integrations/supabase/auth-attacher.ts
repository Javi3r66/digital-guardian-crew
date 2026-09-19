import { supabase } from './client';

export async function attachAuthHeader(request?: Request) {
  if (!request?.headers) {
    return supabase;
  }

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : '';

  if (!token) {
    return supabase;
  }

  return supabase;
}
