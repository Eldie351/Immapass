-- Migration: Add authentication trigger and login tracking
-- Description: Ensures that every user signup automatically creates a profile entry
--              and adds login tracking functionality

-- Add last_login_at column to profiles table for tracking user login activity
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_login_at timestamp with time zone;

-- Create or replace the trigger function that creates a profile when a user signs up
-- This function is called automatically by Supabase Auth when a new user is created
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    new.id, 
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  RETURN new;
END;
$$;

-- Drop the trigger if it exists (to avoid duplicates)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger on auth.users table
-- This trigger fires after a new user is inserted into auth.users
-- and automatically creates a corresponding profile entry
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add a comment to document the trigger
COMMENT ON TRIGGER on_auth_user_created ON auth.users IS 
  'Automatically creates a profile entry when a new user signs up';
