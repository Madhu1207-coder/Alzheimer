"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const u = localStorage.getItem('user')
    if (u) setUser(JSON.parse(u))
  }, [])

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow p-6 text-center">
        <p className="mb-4">You are not signed in.</p>
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div className="text-sm text-gray-700">Name: {user.name || '—'}</div>
      <div className="text-sm text-gray-700">Email: {user.email}</div>
    </div>
  )
}
