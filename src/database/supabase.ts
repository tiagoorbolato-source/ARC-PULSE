import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/src/types/database'
import { env, requireSupabase } from '@/src/config/env'

let adminClient: SupabaseClient<Database> | null = null
let anonClient: SupabaseClient<Database> | null = null

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!adminClient) {
    const { url, serviceKey } = requireSupabase()
    adminClient = createClient<Database>(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return adminClient
}

export function getSupabaseAnon(): SupabaseClient<Database> | null {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return null
  if (!anonClient) {
    anonClient = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  }
  return anonClient
}

export function isSupabaseConfigured(): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
}
