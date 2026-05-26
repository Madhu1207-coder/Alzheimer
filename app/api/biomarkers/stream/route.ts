import { NextRequest } from 'next/server'

// SSE stream disabled - removed live features from UI; endpoint kept for dev if needed.
export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ ok: false, message: 'SSE stream disabled' }), { status: 404 })
}
