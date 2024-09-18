'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon, UnlockIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Level6() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [flag, setFlag] = useState('')
  const correctFlag = 'PACKET_MASTER_2024'
  const router = useRouter()

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    if (!completed.includes(5)) {
      router.push('/')
    } else {
      setIsUnlocked(true)
    }
  }, [router])

  const handleDownload = () => {
    // In a real scenario, this would trigger the download of a packet capture file
    console.log('Downloading packet capture file')
  }

  const handleSubmit = () => {
    if (flag.toUpperCase() === correctFlag) {
      const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
      if (!completed.includes(6)) {
        completed.push(6)
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
        <h1 className="text-3xl font-bold">Level 6: Network Packet Analysis</h1>
      </nav>
      
      <div className="w-full max-w-4xl text-center">
        <UnlockIcon className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <p className="mb-8 text-lg">Analyze the network packet capture to find the hidden flag.</p>
        <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Challenge Content</h2>
          <p className="mb-6 text-lg">Download the packet capture file and use a tool like Wireshark to analyze it. The flag is hidden within the traffic.</p>
          <Button onClick={handleDownload} className="w-full bg-red-900 hover:bg-red-800 mb-4">
            <DownloadIcon className="mr-2 h-4 w-4" /> Download Packet Capture
          </Button>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter the flag"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              className="bg-gray-700 border-red-500 text-white"
            />
            <Button onClick={handleSubmit} className="w-full bg-red-900 hover:bg-red-800">
              Submit Flag
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Hint</h3>
          <p className="text-sm">Look for unusual patterns in the packet data, especially in HTTP or DNS traffic.</p>
        </div>
      </div>
    </div>
  )
}