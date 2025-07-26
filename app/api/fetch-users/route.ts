import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function GET(req: Request) {
    const {data, error} = await supabase.from('users').select('*').limit(143) // adjust when needed... why 143?? ask your gf
    if (error) {
        return Response.json({
            success: false,
            error: error.message
        })
    }

    return Response.json({
        sucess: true,
        users: data
    })
}