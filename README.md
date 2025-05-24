# Vibes - Minimal Web App

A minimal, mobile-first web application built with Next.js, TypeScript, and modern CSS. Features a clean bi-color design that adapts to system theme preferences.

## Features

- 🎨 Minimal, bi-color design (black & white)
- 📱 Mobile-first, responsive layout
- 🌙 Automatic dark/light mode support
- ⚡ Fast loading and modern web standards
- 🎯 Clean, accessible interface
- 📊 TypeScript for type safety

## Design Philosophy

- **Minimal**: Keep everything as simple as possible
- **Bi-color**: Only use black (#000000) and white (#ffffff)
- **Responsive**: Mobile-first, clean design
- **Modern**: Use latest CSS features and clean typography
- **Accessible**: Proper contrast and keyboard navigation

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

# Build and test locally
npm run test-local
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Modern CSS** - Custom properties and system theme support
- **Mobile-first** - Responsive design principles

## Project Structure

```
vibes/
├── app/
│   ├── layout.tsx          # Root layout with basic metadata
│   ├── page.tsx            # Main application page
│   └── globals.css         # Bi-color theme with system support
├── public/
│   └── data/               # Static data files
└── package.json            # Minimal dependencies
```

## CSS Features

- CSS custom properties for theming
- System color scheme support (light/dark)
- Mobile-first responsive design
- Safe area support for mobile devices
- Minimal animations with performance optimization

---

Built with ❤️ for simplicity and good vibes! 