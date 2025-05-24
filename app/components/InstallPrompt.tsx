'use client';

import { useState, useEffect } from 'react';
import { triggerHaptic } from './HapticFeedback';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed (running in standalone mode)
    const checkIfStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                               (window.navigator as any).standalone ||
                               document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkIfStandalone();

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      
      // Only show install button if not already in standalone mode
      if (!isStandalone) {
        setShowInstallButton(true);
      }
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      triggerHaptic('success');
      setShowInstallButton(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    // Listen for display mode changes
    const displayModeQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
      if (e.matches) {
        setShowInstallButton(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    displayModeQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      displayModeQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (!deferredPrompt || isInstalling) return;

    setIsInstalling(true);
    triggerHaptic('medium');

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User response to the install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        triggerHaptic('success');
      } else {
        triggerHaptic('light');
      }
      
    } catch (error) {
      console.error('Install prompt failed:', error);
      triggerHaptic('error');
    } finally {
      // Clear the deferredPrompt variable
      setDeferredPrompt(null);
      setShowInstallButton(false);
      setIsInstalling(false);
    }
  };

  // Don't show install button if already in standalone mode or no prompt available
  if (!showInstallButton || isStandalone || isInstalling) {
    return null;
  }

  return (
    <div className="install-prompt">
      <button
        onClick={handleInstallClick}
        className="install-button"
        disabled={isInstalling}
        style={{
          position: 'fixed',
          bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
          right: 'calc(20px + env(safe-area-inset-right, 0px))',
          backgroundColor: '#4F46E5',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(79, 70, 229, 0.3)',
          zIndex: 1000,
          minHeight: '48px',
          minWidth: '120px',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          transition: 'all 0.25s cubic-bezier(0.4, 0.0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: isInstalling ? 0.7 : 1,
          transform: isInstalling ? 'scale(0.95)' : 'scale(1)',
          animation: 'slideInFromBottom 0.5s ease-out',
        }}
      >
        <span style={{ fontSize: '18px' }}>📱</span>
        {isInstalling ? 'Installing...' : 'Install App'}
      </button>
      
      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        .install-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(79, 70, 229, 0.4);
        }
        
        .install-button:active {
          transform: scale(0.95);
        }
        
        @media (max-width: 768px) {
          .install-button {
            bottom: calc(80px + env(safe-area-inset-bottom, 0px)) !important;
            right: 50% !important;
            transform: translateX(50%) !important;
            padding: 14px 20px !important;
            font-size: 13px !important;
            min-width: 110px !important;
          }
        }
      `}</style>
    </div>
  );
} 