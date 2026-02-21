/*
  # Fix Function Search Path Warnings

  1. Security
    - Fixes the search_path warnings for both trigger functions
    - Maintains SECURITY DEFINER setting for proper execution context
    - Explicitly sets search_path to public to prevent search path manipulation

  2. Changes
    - Recreates update_profiles_updated_at function with proper search_path
    - Recreates handle_new_user function with proper search_path
    - No changes to the actual function logic
*/

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