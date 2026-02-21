/*
  # Fix Remaining Supabase Issues

  1. Verify Triggers
    - Ensure update_profiles_updated_at trigger is properly attached to profiles table
    - Ensure handle_new_user trigger is properly attached to auth.users table
  
  2. Verify RLS Policies
    - Ensure RLS is enabled on profiles table
    - Ensure proper read/update policies exist
*/

-- Ensure RLS is enabled on profiles table
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate the triggers if they don't exist
DO $$
BEGIN
  -- Check and recreate update_profiles_updated_at trigger
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

  -- Check and recreate handle_new_user trigger
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

-- Recreate the RLS policies if they don't exist
DO $$
BEGIN
  -- Check and recreate read policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE polname = 'Users can read their own profile' 
    AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can read their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);
  END IF;
  
  -- Check and recreate update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE polname = 'Users can update their own profile' 
    AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);
  END IF;
END $$;