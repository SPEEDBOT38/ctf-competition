'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, UnlockIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Level1() {
  const [key, setKey] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [hiddenMessage, setHiddenMessage] = useState('')
  const correctKey = 'key'
  const correctHiddenMessage = 'steganography'
  const router = useRouter()

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    if (completed.includes(1)) {
      setIsUnlocked(true)
    }
  }, [])

  const handleUnlock = () => {
    if (key.toLowerCase() === correctKey) {
      setIsUnlocked(true)
      setError('')
    } else {
      setError('Incorrect key. Access denied.')
    }
  }

  const handleDownload = (imageNumber: number) => {
    // Implement download logic here
    console.log(`Downloading image ${imageNumber}`)
  }

  const handleSubmit = () => {
    if (hiddenMessage.toLowerCase() === correctHiddenMessage) {
      const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
      if (!completed.includes(1)) {
        completed.push(1)
        localStorage.setItem('completedLevels', JSON.stringify(completed))
      }
      router.push('/')
    } else {
      setError('Incorrect hidden message. Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center p-4">
      <nav className="w-full max-w-4xl flex justify-between items-center mb-8">
        <Link href="/" className="text-red-500 hover:text-red-400">
          &lt; Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Level 1: Steganography</h1>
      </nav>
      
      <div className="w-full max-w-4xl">
        {!isUnlocked ? (
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <LockIcon className="text-red-500" />
              <Input
                type="password"
                placeholder="Enter access key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-gray-800 border-red-500 text-white"
              />
              <Button onClick={handleUnlock} className="bg-red-900 hover:bg-red-800">
                Unlock
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        ) : (
          <div className="text-center">
            <UnlockIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <p className="mb-8 text-lg">Uncover hidden messages within images. Can you see beyond the pixels?</p>
            <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Challenge Content</h2>
              <p className="mb-6 text-lg">Analyze the following images to find the hidden message:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Image 
                    src="/placeholder1.png"
                    alt="Steganography Image 1" 
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg border-2 border-red-500"
                  />
                  <Button onClick={() => handleDownload(1)} className="w-full bg-red-900 hover:bg-red-800">
                    <DownloadIcon className="mr-2 h-4 w-4" /> Download Image 1
                  </Button>
                </div>
                <div className="space-y-4">
                  <Image 
                    src="/placeholder2.png"
                    alt="Steganography Image 2" 
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg border-2 border-red-500"
                  />
                  <Button onClick={() => handleDownload(2)} className="w-full bg-red-900 hover:bg-red-800">
                    <DownloadIcon className="mr-2 h-4 w-4" /> Download Image 2
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Submission</h3>
              <p className="mb-4">Once you've found the hidden message, enter it below to unlock Level 2:</p>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter hidden message"
                  value={hiddenMessage}
                  onChange={(e) => setHiddenMessage(e.target.value)}
                  className="bg-gray-700 border-red-500 text-white"
                />
                <Button onClick={handleSubmit} className="bg-red-900 hover:bg-red-800">
                  Submit
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}