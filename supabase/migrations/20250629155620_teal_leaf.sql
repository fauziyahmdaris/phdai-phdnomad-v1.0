/*
  # Fix Auth OTP Expiry Warning

  1. Security
    - Add a comment explaining how to fix the Auth OTP long expiry warning
    - This requires manual configuration in the Supabase dashboard

  Note: This migration file serves as documentation only. The actual fix must be done manually in the Supabase dashboard.
*/

-- This is a documentation-only migration file
-- The Auth OTP long expiry warning cannot be fixed via SQL migrations
-- It requires manual configuration in the Supabase dashboard

/*
  To fix the "Auth OTP long expiry" warning:
  
  1. Go to the Supabase dashboard
  2. Navigate to Authentication > Email Templates
  3. Find the "Magic Link" or "Email OTP" settings
  4. Change the OTP expiry time to less than 1 hour (e.g., 30 minutes or 1800 seconds)
  
  This will resolve the security warning about OTP expiry being too long.
*/

-- This is a no-op migration that doesn't change the database schema
SELECT 'Fix Auth OTP expiry warning manually in Supabase dashboard' as message;