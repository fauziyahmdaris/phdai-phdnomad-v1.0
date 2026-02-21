/*
  # Fix Trigger Associations

  1. Changes
    - Ensure the update_profiles_updated_at trigger is properly associated with the profiles table
    - Ensure the handle_new_user trigger is properly associated with the auth.users table
  2. Security
    - Verify trigger definitions and associations
*/

-- First, check if the trigger for update_profiles_updated_at exists and recreate if needed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_profiles_updated_at' 
    AND tgrelid = 'public.profiles'::regclass
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_profiles_updated_at();
  END IF;
END $$;

-- Check if the trigger for handle_new_user exists and recreate if needed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'handle_new_user' 
    AND tgrelid = 'auth.users'::regclass
  ) THEN
    CREATE TRIGGER handle_new_user
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;