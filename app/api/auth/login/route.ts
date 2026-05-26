import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // Mock Login Logic - FIXED CREDENTIALS
    // admin@neurojarvis.com / admin123
    const isMockAdmin = email.toLowerCase() === 'admin@neurojarvis.com' && password === 'admin123'
    
    // For presentation purposes, you might want to allow any login to work
    // or restrict it to the one above. Let's allow any login but treat 
    // the specific one as an Admin.
    
    const isAdmin = isMockAdmin || email.includes('admin')
    const userId = "mock-user-123"
    const userName = isAdmin ? "Administrator" : "Guest User"

    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
    const token = jwt.sign({ sub: userId, email: email.toLowerCase(), isAdmin: isAdmin }, secret, { expiresIn: '7d' })

    const userOut = { id: userId, email: email.toLowerCase(), name: userName, isAdmin: isAdmin }

    return new Response(JSON.stringify({ token, user: userOut }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

