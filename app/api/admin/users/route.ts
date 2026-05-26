import { verifyTokenFromRequest } from '../../../../lib/auth'

export async function GET(request: Request) {
  const payload = verifyTokenFromRequest(request)
  if (!payload || !payload.isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized or Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
  }

  // Mock User List for Demonstration
  const mockUsers = [
    { _id: "mock-user-1", email: "admin@neurojarvis.com", name: "Administrator", isAdmin: true, createdAt: new Date() },
    { _id: "mock-user-2", email: "researcher@example.com", name: "Dr. Smith", isAdmin: false, createdAt: new Date() },
    { _id: "mock-user-3", email: "guest@example.com", name: "Guest User", isAdmin: false, createdAt: new Date() }
  ]

  return new Response(JSON.stringify({ users: mockUsers }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export async function DELETE(request: Request) {
  const payload = verifyTokenFromRequest(request)
  if (!payload || !payload.isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized or Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
  }

  const body = await request.json()
  const id = body?.id
  if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })

  console.log(`Mock delete user: ${id}`)
  return new Response(JSON.stringify({ deletedCount: 1 }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

