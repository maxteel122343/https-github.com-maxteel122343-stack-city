
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eaagbwihobjdyvndhzsz.supabase.co';
// Using the "modern" publishable key for new integration, or the classic "anon" for simpler setup if preferred.
// It seems "modern" is safer but requires client updates if rotated. "anon" is simpler for now for this specific project structure.
// Let's use the explicit ones for now to get it running quickly without env var file hassles if the user is copying files.
// Ideally usage in Vite should be via import.meta.env, but for now I'll hardcode to test, then update later.
// Actually, let's stick to env vars for best practice, but fill .env.local for the user.
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhYWdid2lob2JqZHl2bmRoenN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NDMwMzgsImV4cCI6MjA4NjExOTAzOH0.7XdIDin3Wd3DOpSJcpVFfFTk-MD_j8muZjTNSDo9XVE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
