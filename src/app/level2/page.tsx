'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, UnlockIcon, CopyIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Level2() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [decodedMessage, setDecodedMessage] = useState('')
  const correctDecodedMessage = 'cryptography'
  const router = useRouter()

  const cipherText1 = "Gur frperg jbeq vf pelcgbtencul"
  const cipherText2 = "MHHWCB GPWVHFP: QFCWGBTFNWPC"

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    if (!completed.includes(1)) {
      router.push('/')
    } else {
      setIsUnlocked(true)
    }
  }, [router])

  const handleSubmit = () => {
    if (decodedMessage.toLowerCase() === correctDecodedMessage) {
      const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
      if (!completed.includes(2)) {
        completed.push(2)
        localStorage.setItem('completedLevels', JSON.stringify(completed))
      }
      router.push('/')
    } else {
      setError('Incorrect decoded message. Try again.')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // You can add a temporary "Copied!" message here if you want
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
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
        <h1 className="text-3xl font-bold">Level 2: Cryptography</h1>
      </nav>
      
      <div className="w-full max-w-4xl text-center">
        <UnlockIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <p className="mb-8 text-lg">Decode the encrypted messages to reveal the hidden truth.</p>
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Challenge Content</h2>
          <p className="mb-6 text-lg">Decrypt the following messages:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <code className="text-green-400 break-all">
                  {cipherText1}
                </code>
              </div>
              <Button onClick={() => copyToClipboard(cipherText1)} className="w-full bg-red-900 hover:bg-red-800">
                <CopyIcon className="mr-2 h-4 w-4" /> Copy Cipher Text 1
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <code className="text-green-400 break-all">
                  {cipherText2}
                </code>
              </div>
              <Button onClick={() => copyToClipboard(cipherText2)} className="w-full bg-red-900 hover:bg-red-800">
                <CopyIcon className="mr-2 h-4 w-4" /> Copy Cipher Text 2
              </Button>
            </div>
          </div>
          <p className="text-sm mt-4">Hint: These messages are encoded using different substitution ciphers.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Submission</h3>
          <p className="mb-4">Once you've decoded the messages, enter the secret word below to unlock Level 3:</p>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter decoded message"
              value={decodedMessage}
              onChange={(e) => setDecodedMessage(e.target.value)}
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