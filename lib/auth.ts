import jwt from 'jsonwebtoken'

export function getTokenFromRequest(request: Request) {
  const auth = request.headers.get('authorization') || ''
  if (auth.toLowerCase().startsWith('bearer ')) return auth.slice(7)
  // also support cookie-based token in 'cookie' header (simple parser)
  const cookie = request.headers.get('cookie') || ''
  const match = cookie.match(/(?:^|; )token=([^;]+)/)
  if (match) return decodeURIComponent(match[1])
  return null
}

export function verifyTokenFromRequest(request: Request) {
  const token = getTokenFromRequest(request)
  if (!token) return null
  const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
  try {
    const payload = jwt.verify(token, secret) as any
    return payload
  } catch (err) {
    return null
  }
}
