'use client'

import { useEffect, useState, useRef } from 'react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  refreshThreshold?: number
}

export default function PullToRefresh({ 
  onRefresh, 
  children, 
  refreshThreshold = 80 
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return

    const currentY = e.touches[0].clientY
    const distance = Math.max(0, (currentY - startY.current) * 0.5)
    
    if (distance > 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance, refreshThreshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance >= refreshThreshold && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    
    setIsPulling(false)
    setPullDistance(0)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, pullDistance, isRefreshing])

  const progress = Math.min(pullDistance / refreshThreshold, 1)
  const shouldTrigger = pullDistance >= refreshThreshold

  return (
    <div ref={containerRef} className="pull-to-refresh-container">
      <div 
        className={`pull-to-refresh-indicator ${isRefreshing ? 'refreshing' : ''} ${shouldTrigger ? 'ready' : ''}`}
        style={{
          transform: `translateY(${Math.max(0, pullDistance - 50)}px)`,
          opacity: pullDistance > 0 ? 1 : 0,
        }}
      >
        <div 
          className="refresh-spinner"
          style={{
            transform: `rotate(${progress * 360}deg)`,
            animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8z"
              fill="currentColor"
            />
            <path
              d="M12 18c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="refresh-text">
          {isRefreshing ? 'Refreshing...' : shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </div>
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  )
} 