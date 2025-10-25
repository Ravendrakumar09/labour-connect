-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  address TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('worker', 'user')),
  skills TEXT,
  experience TEXT,
  hourly_rate DECIMAL(10,2),
  availability TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to all profiles
CREATE POLICY "Public can read all profiles" ON profiles
  FOR SELECT USING (true);

-- Policy for public insert access (for registration)
CREATE POLICY "Public can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- Policy for public update access (for profile updates)
CREATE POLICY "Public can update profiles" ON profiles
  FOR UPDATE USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_skills ON profiles USING gin(to_tsvector('english', skills));
CREATE INDEX IF NOT EXISTS idx_profiles_address ON profiles USING gin(to_tsvector('english', address));
