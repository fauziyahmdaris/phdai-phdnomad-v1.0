/*
  # Fix Function Search Path Issues

  This migration addresses the function_search_path_mutable warnings by:
  1. Recreating the update_profiles_updated_at function with proper search_path
  2. Recreating the handle_new_user function with proper search_path
  
  Both functions are set with SECURITY DEFINER and explicit search_path
  to prevent potential security issues.
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