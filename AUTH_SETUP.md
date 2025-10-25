# Authentication Setup Guide

This guide will help you set up the simplified authentication system for the Labour Connect application.

## Prerequisites

1. A Supabase account and project
2. Node.js and npm installed
3. Environment variables configured

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands from `supabase-schema.sql` to create the necessary tables and policies

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features Implemented

### Simplified Authentication System
- **Registration Page** (`/register`): Multi-step registration for both workers and clients
- **Profile Management** (`/profile`): Users can view and edit their profiles
- **Authentication Context**: Global state management using localStorage
- **No Email Authentication**: Simplified system without email verification

### User Types
- **Workers**: Can register with skills, experience, hourly rates, and availability
- **Clients**: Can register to hire workers

### Registration Flow
1. **User Type Selection**: Choose between Worker or Client
2. **Details Form**: Fill in personal and professional information
3. **Direct Registration**: No email verification required

### Security Features
- Row Level Security (RLS) policies in Supabase
- Local storage for user session management
- Secure profile updates

## API Endpoints

- `POST /api/register`: Create user profile directly
- `GET /api/user?id={id}`: Get user profile by ID
- `PUT /api/user`: Update user profile
- `GET /api/worker`: Get workers with optional filtering
- `POST /api/worker`: Update worker profile

## Navigation Updates

The navbar now includes:
- Dynamic navigation based on user type
- User profile dropdown with sign out option
- Conditional links for workers and clients
- Mobile-responsive design
- Simplified registration flow

## Usage

1. **For Workers**:
   - Register with skills and experience
   - Set hourly rates and availability
   - Update profile information
   - Access worker-specific features

2. **For Clients**:
   - Register to hire workers
   - Access client dashboard
   - Browse available workers
   - Manage hiring process

## Key Changes Made

- **Removed email authentication**: No more email/password login system
- **Simplified registration**: Direct registration without email verification
- **Local storage**: User sessions managed through localStorage
- **Updated database schema**: Removed email field, using SERIAL ID instead of UUID
- **Streamlined API**: Simplified API endpoints without authentication requirements

## Next Steps

1. Set up your Supabase project
2. Run the database schema
3. Configure environment variables
4. Test the registration flow
5. Customize the UI as needed

The simplified authentication system is now ready to use!
