'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    if (displayChildren !== children) {
      setIsTransitioning(true)
      
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
      }, 80) // Much faster transition

      return () => clearTimeout(timeout)
    }
  }, [children, displayChildren])

  return (
    <div 
      className={`page-transition ${isTransitioning ? 'transitioning' : ''}`}
      style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateY(5px)' : 'translateY(0)', // Less movement
        transition: 'opacity 80ms ease-out, transform 80ms ease-out', // Faster
        willChange: 'opacity, transform',
      }}
    >
      {displayChildren}
    </div>
  )
} 