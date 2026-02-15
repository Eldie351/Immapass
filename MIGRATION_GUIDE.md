# Manual Database Migration Guide

## Overview
Since the Supabase CLI requires Docker (which isn't set up), you'll need to apply the migration manually through the Supabase Dashboard.

## Steps to Apply the Migration

### 1. Open Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **zodnqugizekimycoknyz**

### 2. Open SQL Editor
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**

### 3. Copy and Execute the Migrations

You need to run TWO migrations. Execute them in order:

#### Migration 1: Authentication Trigger

**File**: [20260210_add_auth_trigger.sql](file:///C:/Users/EUPH-DG-PC/Immapass/supabase/migrations/20260210_add_auth_trigger.sql)

```sql
-- Add last_login_at column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_login_at timestamp with time zone;

-- Create or replace the trigger function
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

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add documentation
COMMENT ON TRIGGER on_auth_user_created ON auth.users IS 
  'Automatically creates a profile entry when a new user signs up';
```

Click **Run** to execute this migration.

#### Migration 2: Consultation Requests Table

**File**: [20260210_add_consultation_requests.sql](file:///C:/Users/EUPH-DG-PC/Immapass/supabase/migrations/20260210_add_consultation_requests.sql)

```sql
-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name text NOT NULL,
    user_email text,
    user_phone text,
    responses jsonb NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    assigned_to uuid REFERENCES auth.users(id),
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON public.consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON public.consultation_requests(created_at DESC);

-- Add trigger to update updated_at
CREATE TRIGGER update_consultation_requests_updated_at
    BEFORE UPDATE ON public.consultation_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can create consultation requests"
    ON public.consultation_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view consultation requests"
    ON public.consultation_requests FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update consultation requests"
    ON public.consultation_requests FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Add documentation
COMMENT ON TABLE public.consultation_requests IS 
    'Stores consultation requests from users when the chatbot is uncertain about program recommendations';
```

Click **Run** to execute this migration.

#### Migration 3: Delete User Function

**File**: [20260210_add_delete_user_function.sql](file:///C:/Users/EUPH-DG-PC/Immapass/supabase/migrations/20260210_add_delete_user_function.sql)

```sql
-- Create function to delete user account
CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_user_id uuid;
BEGIN
  -- Get the current authenticated user's ID
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Delete the user from auth.users
  -- This will cascade delete the profile due to ON DELETE CASCADE
  DELETE FROM auth.users WHERE id = current_user_id;
END;
$$;

-- Add comment
COMMENT ON FUNCTION public.delete_user() IS 
  'Allows authenticated users to delete their own account';
```

Click **Run** to execute this migration.

### 4. Verify the Migrations
### 4. Verify the Migrations

After running both SQL migrations:

1. Go to **Database** → **Tables** in the left sidebar
2. Verify these tables exist:
   - `profiles` table with the `last_login_at` column
   - `consultation_requests` table with all its columns
3. Go to **Database** → **Triggers**
4. Verify the `on_auth_user_created` trigger exists on the `auth.users` table

## What This Does

✅ **Automatic Profile Creation**: Every time a user signs up, a profile entry is automatically created in the `profiles` table

✅ **Login Tracking**: The `last_login_at` field allows you to track when users last logged in (you'll need to update this in your app code)

✅ **Consultation Requests Storage**: When the chatbot is uncertain about recommendations, all user data is saved to `consultation_requests` table for team review

✅ **Name Collection First**: The chatbot now asks for the user's name before asking other questions

✅ **Team Review Workflow**: All uncertain cases are stored with status tracking (pending/in_progress/completed) for your team to manage

## Next Steps

After applying these migrations, you can:
1. Test the signup flow to verify profiles are created automatically
2. Test the chatbot to see the new name collection flow
3. Complete a chatbot conversation to verify data is saved to `consultation_requests`
4. View consultation requests in Supabase Dashboard → Table Editor → consultation_requests
