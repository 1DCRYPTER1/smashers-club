import { createClient } from '@supabase/supabase-js'

// Replace these with the values from your first screenshot!
const supabaseUrl = 'https://tagetuqraopcgheuvaaa.supabase.co'
const supabaseAnonKey = 'sb_publishable_4ZZccgdFf2UInJgyyBJz6w_6FNmPejY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)