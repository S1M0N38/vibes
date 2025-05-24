'use client';

import { useEffect } from 'react';
import { triggerHaptic } from './HapticFeedback';

export default function TouchGestures() {
  useEffect(() => {
    // Enhanced gesture handling with haptic feedback - faster
    let startY = 0;
    let currentY = 0;
    let isRefreshing = false;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      currentY = e.touches[0].clientY;
      
      // Only allow pull-to-refresh at the top of the page - reduced threshold
      if (window.scrollY === 0 && currentY > startY + 30 && !isRefreshing) {
        const pullDistance = Math.min((currentY - startY) / 6, 15); // Less movement
        
        // Add visual feedback with smooth transition
        document.body.style.transform = `translateY(${pullDistance}px)`;
        document.body.style.transition = 'none';
        
        // Light haptic feedback when pull threshold is reached - smaller threshold
        if (currentY > startY + 50) {
          triggerHaptic('light');
        }
      }
    };

    const handleTouchEnd = () => {
      const touchDuration = Date.now() - startTime;
      const pullDistance = currentY - startY;
      
      if (window.scrollY === 0 && pullDistance > 60 && !isRefreshing) { // Reduced threshold
        isRefreshing = true;
        
        // Success haptic feedback
        triggerHaptic('success');
        
        // Refresh the page with faster animation
        document.body.style.transform = 'translateY(20px)'; // Less movement
        document.body.style.transition = 'transform 0.15s ease'; // Faster
        
        setTimeout(() => {
          window.location.reload();
        }, 150); // Faster reload
      } else {
        // Reset transform with smooth animation - faster
        document.body.style.transform = '';
        document.body.style.transition = 'transform 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)';
      }
      
      // Clean up transition styles - faster
      setTimeout(() => {
        document.body.style.transition = '';
      }, 150);
    };

    // Enhanced button haptic feedback
    const addHapticFeedback = () => {
      // Primary buttons - medium feedback
      const primaryButtons = document.querySelectorAll('button[type="submit"], .cta-button, .install-button');
      primaryButtons.forEach((button) => {
        button.addEventListener('touchstart', () => {
          triggerHaptic('medium');
        }, { passive: true });
      });

      // Feature cards - light feedback
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        card.addEventListener('touchstart', () => {
          triggerHaptic('light');
        }, { passive: true });
      });

      // Navigation links - light feedback
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach((link) => {
        link.addEventListener('touchstart', () => {
          triggerHaptic('light');
        }, { passive: true });
      });

      // General buttons - light feedback
      const allButtons = document.querySelectorAll('button:not([type="submit"]), [role="button"]');
      allButtons.forEach((button) => {
        if (!button.classList.contains('haptic-enabled')) {
          button.classList.add('haptic-enabled');
          button.addEventListener('touchstart', () => {
            triggerHaptic('light');
          }, { passive: true });
        }
      });
    };

    // Double-tap to zoom gesture (disabled for app-like experience)
    const preventDoubleTab = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      
      const now = Date.now();
      const target = e.target as HTMLElement;
      const lastTap = parseInt(target?.getAttribute?.('data-last-tap') || '0');
      
      if (now - lastTap < 200) { // Faster double-tap detection
        e.preventDefault();
      }
      
      target?.setAttribute?.('data-last-tap', now.toString());
    };

    // Add event listeners for mobile touch
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Prevent double-tap zoom for app-like experience
      document.addEventListener('touchstart', preventDoubleTab, { passive: false });
    }

    // Add haptic feedback after DOM is ready and on dynamic content
    const initHaptics = () => {
      addHapticFeedback();
      
      // Re-apply haptic feedback to new elements
      const observer = new MutationObserver(() => {
        addHapticFeedback();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      return observer;
    };

    const observer = initHaptics();

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchstart', preventDoubleTab);
      observer?.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
} 