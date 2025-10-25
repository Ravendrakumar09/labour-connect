import { createClient } from '@/utils/supaabse/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const skills = searchParams.get('skills');
    const location = searchParams.get('location');

    let query = supabase
      .from('profiles')
      .select('*')
      .eq('user_type', 'worker');

    if (id) {
      query = query.eq('id', id);
    }

    if (skills) {
      query = query.ilike('skills', `%${skills}%`);
    }

    if (location) {
      query = query.ilike('address', `%${location}%`);
    }

    const { data: workers, error } = await query;

    if (error) {
      console.error('Workers fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch workers' }, { status: 500 });
    }

    return NextResponse.json({ workers });
  } catch (error) {
    console.error('Workers fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Update worker profile
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_type', 'worker')
      .select()
      .single();

    if (error) {
      console.error('Worker update error:', error);
      return NextResponse.json({ error: 'Failed to update worker profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true, worker: data });
  } catch (error) {
    console.error('Worker update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
