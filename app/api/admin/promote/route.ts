// Development-only endpoint to promote a user to admin using a secret key
export async function POST(request: Request) {
  // In a mock setup, we'll allow this for demonstration in development/preview
  try {
    const body = await request.json()
    const { email, key } = body || {}
    if (!email || !key) return new Response(JSON.stringify({ error: 'email and key required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })

    const promoKey = process.env.ADMIN_PROMO_KEY || 'dev_promote_key'
    if (key !== promoKey) return new Response(JSON.stringify({ error: 'invalid key' }), { status: 401, headers: { 'Content-Type': 'application/json' } })

    console.log(`Mock promote user to admin: ${email}`)

    return new Response(JSON.stringify({ updatedCount: 1, message: "User promoted (Mock)" }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

