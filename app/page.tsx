'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, X, SkipForward, RotateCcw } from 'lucide-react'

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
  
  // Pull-to-refresh state
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const touchStartY = useRef(0)
  const touchCurrentY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Pull-to-refresh constants
  const PULL_THRESHOLD = 80
  const MAX_PULL_DISTANCE = 120

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

  // Pull-to-refresh touch handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isRefreshing) return
      touchStartY.current = e.touches[0].clientY
      touchCurrentY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isRefreshing) return
      
      touchCurrentY.current = e.touches[0].clientY
      const deltaY = touchCurrentY.current - touchStartY.current

      // Only allow pull-to-refresh when starting from near the top and pulling down
      if (touchStartY.current > 50 || deltaY <= 0) {
        if (isPulling) {
          setIsPulling(false)
          setPullDistance(0)
        }
        return
      }

      // Calculate pull distance with resistance
      const pullDistance = Math.min(deltaY * 0.5, MAX_PULL_DISTANCE)
      
      if (pullDistance > 10) {
        if (!isPulling) setIsPulling(true)
        setPullDistance(pullDistance)
        
        // Prevent default scrolling behavior during pull
        e.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      if (isRefreshing) return
      
      if (isPulling && pullDistance >= PULL_THRESHOLD) {
        // Trigger refresh
        setIsRefreshing(true)
        
        // Add a small delay for UX, then reload
        setTimeout(() => {
          window.location.reload()
        }, 300)
      } else {
        // Reset pull state
        setIsPulling(false)
        setPullDistance(0)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isPulling, pullDistance, isRefreshing])

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
      {/* Pull-to-refresh indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="pull-refresh-indicator"
          style={{
            transform: `translateY(${Math.max(0, pullDistance - 20)}px)`,
            opacity: Math.min(pullDistance / PULL_THRESHOLD, 1)
          }}
        >
          <div className={`pull-icon ${isRefreshing ? 'refreshing' : ''}`}>
            <RotateCcw size={24} />
          </div>
          <div className="pull-text">
            {isRefreshing ? 'Refreshing...' : pullDistance >= PULL_THRESHOLD ? 'Release to refresh' : 'Pull to refresh'}
          </div>
        </div>
      )}

      <div 
        ref={containerRef}
        className="container"
        style={{
          transform: isPulling ? `translateY(${Math.min(pullDistance * 0.3, 30)}px)` : 'translateY(0)',
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
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