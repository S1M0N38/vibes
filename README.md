# Taboo Game PWA

A minimal, mobile-first Progressive Web App for playing the classic Taboo word guessing game.

## Features

- 🎯 Over 1,300 English taboo cards
- 📱 Mobile-optimized, responsive design
- 🎨 Clean, minimal interface
- 🌙 Dark/light mode support
- 📊 Score tracking (correct vs skipped)
- 🚀 PWA support - install on your device
- ⚡ Fast loading with offline support

## How to Play

1. **Start the Game**: Click "Start Game" to begin
2. **Describe the Word**: Help your team guess the word at the top of the card
3. **Avoid Taboo Words**: Don't say any of the forbidden words listed in red
4. **Score Points**: Click "✓ Correct" when your team guesses right
5. **Skip if Needed**: Click "↷ Skip" if you want to move to the next card

## Game Rules

- One player describes the word while others guess
- The describing player cannot use any of the taboo words
- If a taboo word is said, the card should be skipped
- Try to get as many correct guesses as possible!

## Data Source

The taboo cards are sourced from the [S1M0N38/tabu](https://github.com/S1M0N38/tabu) repository, which provides high-quality taboo game cards in multiple languages.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **PWA** - Progressive Web App capabilities
- **Mobile-first** - Responsive design

## PWA Features

- Install as native app on mobile/desktop
- Offline support for previously loaded content
- Fast loading with service worker caching
- Native app-like experience

---

Built with ❤️ for taboo game enthusiasts! 