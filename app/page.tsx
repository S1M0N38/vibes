'use client'

import { useState, useEffect } from 'react'
import { Check, X, SkipForward, RotateCcw } from 'lucide-react'

interface TabooCard {
  guess_word: string
  taboo_words: string[]
}

export default function TabooGame() {
  const [cards, setCards] = useState<TabooCard[]>([])
  const [currentCard, setCurrentCard] = useState<TabooCard | null>(null)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [skipped, setSkipped] = useState(0)
  const [loading, setLoading] = useState(true)

  // Load cards from data
  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('./data/cards.eng.jsonl')
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
        
        // Start with a random card
        const randomIndex = Math.floor(Math.random() * cardData.length)
        setCurrentCard(cardData[randomIndex])
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

  const resetGame = () => {
    setScore(0)
    setErrors(0)
    setSkipped(0)
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
        {/* Reload Button */}
        <div className="reload-section">
          <button className="reload-button" onClick={resetGame} title="Reset game">
            <RotateCcw size={24} />
          </button>
        </div>

        {/* Counters */}
        <div className="counters">
          <div className="counter">
            <X size={20} />
            <span className="counter-value">{errors}</span>
          </div>
          <div className="counter">
            <Check size={20} />
            <span className="counter-value">{score}</span>
          </div>
          <div className="counter">
            <SkipForward size={20} />
            <span className="counter-value">{skipped}</span>
          </div>
        </div>

        {/* Flex spacer */}
        <div className="flex-spacer"></div>

        {/* Card */}
        <div className="card">
          <div className="guess-word">
            {currentCard.guess_word.toUpperCase()}
          </div>
          <div className="divider"></div>
          <div className="taboo-words">
            {currentCard.taboo_words.map((word, index) => (
              <div key={index} className="taboo-word">
                {word.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Flex spacer */}
        <div className="flex-spacer"></div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-button wrong" onClick={markError} title="Wrong">
            <X size={24} />
          </button>
          <button className="action-button correct" onClick={markCorrect} title="Correct">
            <Check size={24} />
          </button>
          <button className="action-button skip" onClick={skipCard} title="Skip">
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </main>
  )
} 