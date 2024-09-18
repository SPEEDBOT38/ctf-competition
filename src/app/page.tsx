'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { LockIcon, UnlockIcon, CheckCircleIcon, RefreshCcwIcon } from 'lucide-react'
import CodeBackground from '@/components/codebackground'

export default function LandingPage() {
  const [completedLevels, setCompletedLevels] = useState<number[]>([])

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]')
    setCompletedLevels(completed)
  }, [])

  const resetProgress = () => {
    localStorage.removeItem('completedLevels');
    setCompletedLevels([]);
  };

  const LevelButton = ({ level, title }: { level: number, title: string }) => (
    <Link href={completedLevels.includes(level - 1) || level === 1 ? `/level${level}` : "#"} passHref>
      <Button 
        className={`w-full ${
          completedLevels.includes(level) 
            ? 'bg-green-700 hover:bg-green-600' 
            : 'bg-red-900 hover:bg-red-800'
        } text-white hover-glow`}
        disabled={!completedLevels.includes(level - 1) && level !== 1}
      >
        {completedLevels.includes(level) ? (
          <CheckCircleIcon className="mr-2" />
        ) : completedLevels.includes(level - 1) || level === 1 ? (
          <UnlockIcon className="mr-2" />
        ) : (
          <LockIcon className="mr-2" />
        )}
        Level {level}: {title}
      </Button>
    </Link>
  )

  return (
    <div className="relative min-h-screen bg-black text-red-500 font-mono flex flex-col justify-center items-center p-4 overflow-hidden">
      <CodeBackground />
      <div className="relative z-10 backdrop-blur-sm bg-black/30 p-8 rounded-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">H4CK3R CTF</h1>
        <p className="text-xl mb-12 text-center">Do you have what it takes to crack the code?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LevelButton level={1} title="Steganography" />
          <LevelButton level={2} title="Cryptography" />
          <LevelButton level={3} title="Buffer Overflow" />
          <LevelButton level={4} title="SQL Injection" />
          <LevelButton level={5} title="Cross-Site Scripting" />
          <LevelButton level={6} title="Network Packet Analysis" />
        </div>
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={resetProgress}
            className="bg-yellow-600 hover:bg-yellow-500 text-white hover-glow"
          >
            <RefreshCcwIcon className="mr-2" />
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  )
}