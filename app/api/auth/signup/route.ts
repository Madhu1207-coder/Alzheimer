export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // Mock Signup Logic
    // In a real app we would check if the user exists in a database.
    // For this demo, we'll just mock a successful creation.
    
    console.log(`Mock signup for: ${email}`)

    return new Response(JSON.stringify({ 
      message: "User created successfully (Mock)",
      insertedId: "mock-user-" + Math.random().toString(36).substr(2, 9) 
    }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

