import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(req: Request) {
    const body = await req.json()

    const {uuid, name, email} = body

    const {error} = await supabase.from('users').insert({
        uuid,
        name,
        email
    });

    if (error){
        return Response.json({ success: false, error: error.message });
    }

    return Response.json({ success: true, message: 'User registered successfully' });
}