'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, UnlockIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Level4() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    if (!completed.includes(3)) {
      router.push('/')
    } else {
      setIsUnlocked(true)
    }
  }, [router])

  const handleLogin = () => {
    // Simulating vulnerable SQL query
    // The correct injection is: username: "admin' --" and password: anything
    if (username.toLowerCase().includes("admin'") && username.toLowerCase().includes("--")) {
      const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
      if (!completed.includes(4)) {
        completed.push(4)
        localStorage.setItem('completedLevels', JSON.stringify(completed))
      }
      router.push('/')
    } else {
      setError('Login failed. Try again.')
    }
  }

  if (!isUnlocked) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center p-4">
      <nav className="w-full max-w-4xl flex justify-between items-center mb-8">
        <Link href="/" className="text-red-500 hover:text-red-400">
          &lt; Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Level 4: SQL Injection</h1>
      </nav>
      
      <div className="w-full max-w-4xl text-center">
        <UnlockIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <p className="mb-8 text-lg">Exploit the vulnerable login form to gain unauthorized access.</p>
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Challenge Content</h2>
          <p className="mb-6 text-lg">This login form is vulnerable to SQL injection. Can you bypass it?</p>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-700 border-red-500 text-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-red-500 text-white"
            />
            <Button onClick={handleLogin} className="w-full bg-red-900 hover:bg-red-800">
              Login
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Hint</h3>
          <p className="text-sm">The backend uses a query like: SELECT * FROM users WHERE username = '[INPUT]' AND password = '[INPUT]'</p>
        </div>
      </div>
    </div>
  )
}