import { supabase } from './client';

export async function attachAuthHeader(request?: any) {
  if (!request || !request.headers) {
    return supabase;
  }

  const authHeader = typeof request.headers.get === 'function' ? request.headers.get('authorization') || '' : '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : '';

  return supabase;
}
