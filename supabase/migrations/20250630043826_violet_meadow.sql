/*
  # Fix Remaining Supabase Issues

  1. Security
    - Ensure RLS is enabled on profiles table
    - Recreate RLS policies if they don't exist
    - Fix trigger functions with proper search_path

  2. Changes
    - Uses conditional logic to avoid errors on existing objects
    - Safely enables RLS without recreating tables
    - Ensures proper security settings for functions
*/

-- Ensure RLS is enabled on profiles table
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

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

-- Fix for update_profiles_updated_at function with proper search_path
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Fix for handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, institution, department, account_type, is_freemium)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'institution',
    NEW.raw_user_meta_data->>'department',
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'normal'),
    COALESCE((NEW.raw_user_meta_data->>'is_freemium')::boolean, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

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