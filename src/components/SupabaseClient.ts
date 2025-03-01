import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://alaxtgjllzybjtjzficq.supabase.co'
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsYXh0Z2psbHp5Ymp0anpmaWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MDIxMTUsImV4cCI6MjA1NjM3ODExNX0.qFB985Bmd1TMXi5LKdd4LqjGaXs6Jig3dR_APVv7nnA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);