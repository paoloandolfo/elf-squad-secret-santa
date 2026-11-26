import { createClient } from '@supabase/supabase-js'

// These two values are public by design: the database only lets the browser call the santa_* functions.
// They can be overridden with VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (e.g. in .env.local).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://tyirjxzajbrbnzsvtevd.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_UlhEJtiCUYPFowRLV_H5VA_w37urFSX'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } })
