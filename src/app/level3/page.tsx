'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, UnlockIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Level3() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [exploitCode, setExploitCode] = useState('')
  const correctExploitCode = 'overflow'
  const router = useRouter()

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    if (!completed.includes(2)) {
      router.push('/')
    } else {
      setIsUnlocked(true)
    }
  }, [router])

  const handleSubmit = () => {
    if (exploitCode.toLowerCase() === correctExploitCode) {
      const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
      if (!completed.includes(3)) {
        completed.push(3)
        localStorage.setItem('completedLevels', JSON.stringify(completed))
      }
      router.push('/')
    } else {
      setError('Incorrect exploit code. Try again.')
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
        <h1 className="text-3xl font-bold">Level 3: Buffer Overflow</h1>
      </nav>
      
      <div className="w-full max-w-4xl text-center">
        <UnlockIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <p className="mb-8 text-lg">Exploit the vulnerability to gain control of the system.</p>
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Challenge Content</h2>
          <p className="mb-6 text-lg">Analyze the following code snippet and find the vulnerability:</p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-left">
            <pre className="text-green-400">
              <code>{`
void vulnerable_function(char *input) {
    char buffer[64];
    strcpy(buffer, input);
    printf("Input: %s\n", buffer);
}

int main() {
    char user_input[256];
    printf("Enter your input: ");
    scanf("%s", user_input);
    vulnerable_function(user_input);
    return 0;
}
              `}</code>
            </pre>
          </div>
          <p className="text-sm">Hint: Look for functions that don't perform bounds checking.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Submission</h3>
          <p className="mb-4">Enter the type of vulnerability you've identified to complete the challenge:</p>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter vulnerability type"
              value={exploitCode}
              onChange={(e) => setExploitCode(e.target.value)}
              className="bg-gray-700 border-red-500 text-white"
            />
            <Button onClick={handleSubmit} className="bg-red-900 hover:bg-red-800">
              Submit
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}