/*
  # Fix Function Search Path Issues

  1. Security
     - Set explicit search_path for functions to prevent security issues
     - Apply SECURITY DEFINER to both functions

  2. Changes
     - Fix update_profiles_updated_at function
     - Fix handle_new_user function
     - Ensure proper syntax for PostgreSQL functions
*/

-- Fix for update_profiles_updated_at function
CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Fix for handle_new_user function
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