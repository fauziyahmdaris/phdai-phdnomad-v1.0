/*
  # Fix RLS Policies

  1. Changes
    - Ensure Row Level Security is enabled on the profiles table
    - Verify and recreate the RLS policies for the profiles table
  2. Security
    - Proper RLS configuration for data protection
*/

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate the RLS policies for profiles table
DO $$
BEGIN
  -- Drop existing policies if they exist to avoid conflicts
  DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  
  -- Create the read policy
  CREATE POLICY "Users can read their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
  
  -- Create the update policy
  CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
END $$;