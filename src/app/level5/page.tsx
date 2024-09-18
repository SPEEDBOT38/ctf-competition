'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, UnlockIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Level5() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [comment, setComment] = useState('')
  const [submittedComment, setSubmittedComment] = useState('')
  const [hiddenFlag, setHiddenFlag] = useState('')
  const router = useRouter()

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    if (!completed.includes(4)) {
      router.push('/')
    } else {
      setIsUnlocked(true)
    }
  }, [router])

  const handleSubmit = () => {
    setSubmittedComment(comment)
    if (comment.includes('<script>') && comment.includes('</script>')) {
      setHiddenFlag('XSS_MASTER_2024')
    } else {
      setHiddenFlag('')
    }
  }

  const handleFlagSubmit = () => {
    if (hiddenFlag === 'XSS_MASTER_2024') {
      const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
      if (!completed.includes(5)) {
        completed.push(5)
        localStorage.setItem('completedLevels', JSON.stringify(completed))
      }
      router.push('/')
    } else {
      setError('Incorrect flag. Try again.')
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
        <h1 className="text-3xl font-bold">Level 5: Cross-Site Scripting (XSS)</h1>
      </nav>
      
      <div className="w-full max-w-4xl text-center">
        <UnlockIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <p className="mb-8 text-lg">Inject a script to reveal the hidden flag.</p>
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Challenge Content</h2>
          <p className="mb-6 text-lg">Submit a comment that will execute a script and reveal the hidden flag.</p>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-700 border-red-500 text-white"
            />
            <Button onClick={handleSubmit} className="w-full bg-red-900 hover:bg-red-800">
              Submit Comment
            </Button>
          </div>
          {submittedComment && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Submitted Comment:</h3>
              <p dangerouslySetInnerHTML={{ __html: submittedComment }} />
            </div>
          )}
          {hiddenFlag && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Hidden Flag:</h3>
              <p>{hiddenFlag}</p>
              <Input
                type="text"
                placeholder="Enter the flag"
                className="bg-gray-700 border-red-500 text-white mt-2"
                onChange={(e) => setHiddenFlag(e.target.value)}
              />
              <Button onClick={handleFlagSubmit} className="w-full bg-red-900 hover:bg-red-800 mt-2">
                Submit Flag
              </Button>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Hint</h3>
          <p className="text-sm">The comment field is vulnerable to XSS. Try injecting a script that will execute when the comment is displayed.</p>
        </div>
      </div>
    </div>
  )
}