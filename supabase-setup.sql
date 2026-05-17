-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- The 'reviews' table already exists, only 'submissions' needs to be created.

-- Submissions table (for public app suggestions)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  app_name TEXT NOT NULL,
  app_url TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  pricing TEXT,
  submitter_name TEXT,
  submitter_email TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert submissions
CREATE POLICY "Anyone can submit" ON submissions
  FOR INSERT WITH CHECK (true);

-- Allow reading submissions (for admin review)
CREATE POLICY "Anyone can read submissions" ON submissions
  FOR SELECT USING (true);
