/*
  # Verify Profiles Table Structure

  1. Changes
    - Ensure the profiles table has all required columns
    - Add any missing columns if needed
  2. Security
    - Maintain data integrity with proper column definitions
*/

-- Check if profiles table exists and create it if not
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'profiles' AND schemaname = 'public') THEN
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      full_name TEXT,
      institution TEXT,
      department TEXT,
      account_type TEXT DEFAULT 'normal'::text,
      is_freemium BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  ELSE
    -- Add any missing columns to existing table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'account_type') THEN
      ALTER TABLE public.profiles ADD COLUMN account_type TEXT DEFAULT 'normal'::text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'is_freemium') THEN
      ALTER TABLE public.profiles ADD COLUMN is_freemium BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'created_at') THEN
      ALTER TABLE public.profiles ADD COLUMN created_at TIMESTAMPTZ DEFAULT now();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'updated_at') THEN
      ALTER TABLE public.profiles ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
  END IF;
END $$;