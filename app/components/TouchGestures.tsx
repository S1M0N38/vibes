'use client';

import { useEffect } from 'react';

export default function TouchGestures() {
  useEffect(() => {
    // Add pull-to-refresh functionality
    let startY = 0;
    let currentY = 0;
    let isRefreshing = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      currentY = e.touches[0].clientY;
      
      // Only allow pull-to-refresh at the top of the page
      if (window.scrollY === 0 && currentY > startY + 50 && !isRefreshing) {
        // Add visual feedback
        document.body.style.transform = `translateY(${Math.min((currentY - startY) / 4, 20)}px)`;
        document.body.style.transition = 'none';
      }
    };

    const handleTouchEnd = () => {
      if (window.scrollY === 0 && currentY > startY + 100 && !isRefreshing) {
        isRefreshing = true;
        
        // Haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        
        // Refresh the page
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
      
      // Reset transform
      document.body.style.transform = '';
      document.body.style.transition = 'transform 0.3s ease';
      
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    };

    // Add event listeners for mobile touch
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Add haptic feedback to buttons
    const addHapticFeedback = () => {
      const buttons = document.querySelectorAll('button, .cta-button, .feature-card');
      buttons.forEach((button) => {
        button.addEventListener('touchstart', () => {
          if ('vibrate' in navigator) {
            navigator.vibrate(30); // Light haptic feedback
          }
        }, { passive: true });
      });
    };

    // Add haptic feedback after DOM is ready
    setTimeout(addHapticFeedback, 100);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return null; // This component doesn't render anything
} 