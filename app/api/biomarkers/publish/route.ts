import { NextRequest } from 'next/server'

// Publish endpoint disabled - live features removed from the UI
export async function POST(req: NextRequest) {
  return new Response(JSON.stringify({ ok: false, message: 'Publish endpoint disabled' }), { status: 404 })
}
