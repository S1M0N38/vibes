'use client'

import { useEffect } from 'react'

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'

interface HapticFeedbackProps {
  pattern?: HapticPattern
  trigger?: boolean
  disabled?: boolean
}

// Haptic patterns mapping
const HAPTIC_PATTERNS = {
  light: [10],
  medium: [20],
  heavy: [50],
  success: [10, 50, 10],
  warning: [20, 100, 20],
  error: [50, 50, 50],
}

export function triggerHaptic(pattern: HapticPattern = 'light') {
  if (typeof window === 'undefined') return

  // Check if device supports haptic feedback
  if ('vibrate' in navigator) {
    const vibrationPattern = HAPTIC_PATTERNS[pattern]
    navigator.vibrate(vibrationPattern)
  }
  
  // For iOS devices with haptic engine (when available)
  if ('hapticFeedback' in window || 'webkitHapticFeedback' in window) {
    try {
      // @ts-ignore - These are experimental APIs
      const haptic = window.hapticFeedback || window.webkitHapticFeedback
      if (haptic) {
        switch (pattern) {
          case 'light':
            haptic.impactOccurred('light')
            break
          case 'medium':
            haptic.impactOccurred('medium')
            break
          case 'heavy':
            haptic.impactOccurred('heavy')
            break
          case 'success':
            haptic.notificationOccurred('success')
            break
          case 'warning':
            haptic.notificationOccurred('warning')
            break
          case 'error':
            haptic.notificationOccurred('error')
            break
        }
      }
    } catch (error) {
      // Fallback to vibration
      navigator.vibrate(HAPTIC_PATTERNS[pattern])
    }
  }
}

// Hook for haptic feedback
export function useHaptic() {
  return {
    trigger: triggerHaptic,
    patterns: HAPTIC_PATTERNS,
  }
}

// Component for conditional haptic feedback
export default function HapticFeedback({ 
  pattern = 'light', 
  trigger = false, 
  disabled = false 
}: HapticFeedbackProps) {
  useEffect(() => {
    if (trigger && !disabled) {
      triggerHaptic(pattern)
    }
  }, [trigger, pattern, disabled])

  return null
}

// Higher-order component to add haptic feedback to any component
export function withHaptic<T extends {}>(
  Component: React.ComponentType<T>,
  defaultPattern: HapticPattern = 'light'
) {
  return function HapticComponent(props: T & { hapticPattern?: HapticPattern; hapticDisabled?: boolean }) {
    const { hapticPattern = defaultPattern, hapticDisabled = false, ...otherProps } = props

    const handleClick = (e: React.MouseEvent) => {
      if (!hapticDisabled) {
        triggerHaptic(hapticPattern)
      }
      // Call original onClick if it exists
      if ('onClick' in otherProps && typeof otherProps.onClick === 'function') {
        otherProps.onClick(e)
      }
    }

    return <Component {...(otherProps as T)} onClick={handleClick} />
  }
} 