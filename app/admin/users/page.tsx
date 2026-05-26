"use client"

import { useEffect, useState } from 'react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const token = typeof window === 'undefined' ? null : localStorage.getItem('token')
      const res = await fetch('/api/admin/users', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      const data = await res.json()
      setUsers(data.users || [])
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete user?')) return
    try {
      const token = typeof window === 'undefined' ? null : localStorage.getItem('token')
      const res = await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ id }) })
      if (!res.ok) throw new Error((await res.json()).error || 'Delete failed')
      await fetchUsers()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="w-full mt-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
      <div className="space-y-2">
        {users.map(user => (
          <div key={user._id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <div className="font-medium">{user.name || user.email}</div>
              <div className="text-xs text-gray-500">{user.email} {user.isAdmin && <span className="ml-2 text-xs text-green-600">(admin)</span>}</div>
            </div>
            <div>
              <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
