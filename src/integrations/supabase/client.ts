import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL : '') || 
  'https://gsjgylomutnburmzrmmd.supabase.co'

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY : '') || 
  'sb_publishable_BE3OnBe-y_k_QNuYy2eDsw_9NH1KuPE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

