'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState("Welcome to Vibes")

  const handleRefresh = () => {
    const messages = [
      "Welcome to Vibes",
      "Good vibes only",
      "Stay positive",
      "Feel the energy",
      "Spread the love"
    ]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setMessage(randomMessage)
  }

  return (
    <main className="main">
      <div className="container">
        <h1 className="title">{message}</h1>
        <p className="subtitle">A minimal PWA with good vibes</p>
        <button className="button" onClick={handleRefresh}>
          Refresh Vibes
        </button>
      </div>
    </main>
  )
} 