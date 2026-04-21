# Supabase bootstrap

This project runs without Supabase by default using local file fallback storage.

When you are ready to enable Supabase:

1. Create a Supabase project.
2. Run schema from `supabase/schema.sql`.
3. Copy keys into `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Restart Next dev server.

The app automatically switches from local file storage to Supabase when service role env vars are present.
