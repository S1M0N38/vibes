'use client'

import { useState, useEffect } from 'react'
import { Check, X, SkipForward } from 'lucide-react'

interface TabooCard {
  guess_word: string
  taboo_words: string[]
  language: string
}

export default function TabooGame() {
  const [cards, setCards] = useState<TabooCard[]>([])
  const [currentCard, setCurrentCard] = useState<TabooCard | null>(null)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [skipped, setSkipped] = useState(0)
  const [loading, setLoading] = useState(true)

  // Load cards from data and start immediately
  useEffect(() => {
    const loadCards = async () => {
      try {
        // Handle base path for static exports (like GitHub Pages)
        const basePath = process.env.NODE_ENV === 'production' 
          ? (process.env.NEXT_PUBLIC_BASE_PATH || '') 
          : ''
        const dataUrl = `${basePath}/data/cards.eng.jsonl`
        
        const response = await fetch(dataUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch cards: ${response.status}`)
        }
        
        const text = await response.text()
        if (!text.trim()) {
          throw new Error('Empty data file')
        }
        
        const cardData = text
          .trim()
          .split('\n')
          .map(line => JSON.parse(line))
          
        if (cardData.length === 0) {
          throw new Error('No valid cards found')
        }
          
        setCards(cardData)
        
        // Start with a random card immediately
        if (cardData.length > 0) {
          const randomIndex = Math.floor(Math.random() * cardData.length)
          setCurrentCard(cardData[randomIndex])
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to load cards:', error)
        setLoading(false)
      }
    }
    loadCards()
  }, [])

  const getRandomCard = () => {
    if (cards.length === 0) return null
    const randomIndex = Math.floor(Math.random() * cards.length)
    return cards[randomIndex]
  }

  const nextCard = () => {
    setCurrentCard(getRandomCard())
  }

  const markCorrect = () => {
    setScore(prev => prev + 1)
    nextCard()
  }

  const markError = () => {
    setErrors(prev => prev + 1)
    nextCard()
  }

  const skipCard = () => {
    setSkipped(prev => prev + 1)
    nextCard()
  }

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <h1 className="title">Loading...</h1>
        </div>
      </main>
    )
  }

  if (!currentCard) {
    return (
      <main className="main">
        <div className="container">
          <h1 className="title">No cards available</h1>
          <p className="subtitle">Please check the data source</p>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <div className="container">
        <div className="game-header">
          <div className="score-board">
            <span className="score">
              <X size={36} /> {errors}
            </span>
            <span className="score">
              <Check size={36} /> {score}
            </span>
            <span className="score">
              <SkipForward size={36} /> {skipped}
            </span>
          </div>
        </div>

        <div className="card">
          <div className="guess-word">
            {currentCard.guess_word.toUpperCase()}
          </div>
          
          <div className="taboo-section">
            <div className="taboo-words">
              {currentCard.taboo_words.map((word, index) => (
                <div key={index} className="taboo-word">
                  {word.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="game-controls">
          <button className="button error" onClick={markError} title="Error">
            <X size={36} />
          </button>
          <button className="button correct" onClick={markCorrect} title="Correct">
            <Check size={36} />
          </button>
          <button className="button skip" onClick={skipCard} title="Skip">
            <SkipForward size={36} />
          </button>
        </div>
      </div>
    </main>
  )
} 