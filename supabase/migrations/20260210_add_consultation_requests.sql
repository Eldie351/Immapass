-- Migration: Add consultation requests table
-- Description: Stores user consultation requests when the bot is uncertain about recommendations

-- Create consultation_requests table to store user data for team review
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

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON public.consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON public.consultation_requests(created_at DESC);

-- Add trigger to update updated_at
CREATE TRIGGER update_consultation_requests_updated_at
    BEFORE UPDATE ON public.consultation_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS policies
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert consultation requests (public form)
CREATE POLICY "Anyone can create consultation requests"
    ON public.consultation_requests
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users (team members) can view consultation requests
CREATE POLICY "Authenticated users can view consultation requests"
    ON public.consultation_requests
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Only authenticated users can update consultation requests
CREATE POLICY "Authenticated users can update consultation requests"
    ON public.consultation_requests
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Add comment
COMMENT ON TABLE public.consultation_requests IS 
    'Stores consultation requests from users when the chatbot is uncertain about program recommendations';
