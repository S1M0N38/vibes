# Vibes Website 🌟

A beautiful, modern static website built with Next.js that can be deployed to GitHub Pages. This project showcases good vibes with a clean, responsive design and smooth animations.

## Features

- 🚀 Built with Next.js 14 and TypeScript
- 🎨 Modern, responsive design with CSS gradients and animations
- 📱 Mobile-friendly layout
- ⚡ Static export for GitHub Pages deployment
- 🎯 SEO optimized
- 🔧 GitHub Actions for automatic deployment

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS3 with modern features (gradients, backdrop-filter, grid)
- **Deployment**: GitHub Pages via GitHub Actions
- **Build**: Static export for optimal performance

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/vibes.git
cd vibes
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website.

### Building for Production

To build and export the static site:

```bash
npm run build
```

This will create an `out` folder with all the static files ready for deployment.

## Deployment to GitHub Pages

### Automatic Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. **Fork or create this repository** on GitHub
2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as the source
3. **Push to the main branch** - the GitHub Action will automatically build and deploy your site

### Manual Setup

If you need to set up deployment manually:

1. Make sure your repository name matches the `basePath` in `next.config.js`
2. Enable GitHub Pages in repository settings
3. The workflow in `.github/workflows/deploy.yml` will handle the rest

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update the `basePath` and `assetPrefix` in `next.config.js` to empty strings

## Project Structure

```
vibes/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page component
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment workflow
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Customization

### Styling

The website uses modern CSS features including:
- CSS Grid for responsive layouts
- CSS Gradients for beautiful backgrounds
- CSS Transforms and Transitions for smooth animations
- Backdrop filters for glassmorphism effects

Edit `app/globals.css` to customize the design.

### Content

Update the content in `app/page.tsx` to customize:
- Hero section text
- Feature cards
- Footer information

### Colors and Branding

The main color scheme can be changed by updating the CSS gradients in `globals.css`:
- Primary gradient: `#667eea` to `#764ba2`
- Card gradients: `#f093fb` to `#f5576c`

## Browser Support

This website supports all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Design inspired by modern web design trends
- Built with the amazing Next.js framework
- Deployed with GitHub Pages

---

Made with ❤️ and good vibes! 🌈 