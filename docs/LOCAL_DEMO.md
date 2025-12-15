# Running the Local Demo

This guide walks you through running the Heroku + Expanso interactive demo on your local machine.

## Prerequisites

- **Node.js 18+** (check with `node --version`)
- **npm 9+** (check with `npm --version`)
- A modern browser (Chrome, Firefox, Safari, Edge)

## Quick Start

```bash
# Navigate to the project directory
cd /path/to/expanso-heroku

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

You should see output like:

```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/expanso-heroku/
  ➜  Network: http://192.168.x.x:5173/expanso-heroku/
  ➜  press h + enter to show help
```

Open the **Local** URL in your browser.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Development Server Features

- **Hot Module Replacement (HMR)**: Changes to code update instantly in the browser
- **Error Overlay**: TypeScript and runtime errors show directly in browser
- **Fast Refresh**: React components preserve state during updates

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

The production build will be in the `dist/` directory.

## Deploying to GitHub Pages

The project includes a GitHub Actions workflow that automatically deploys on push to `main`.

### Manual Setup (One-time)

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select **Source: GitHub Actions**
4. Push any commit to `main` to trigger deployment

### Deployment URL

After deployment, your demo will be available at:
```
https://[your-username].github.io/expanso-heroku/
```

## Troubleshooting

### Port already in use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Dependencies out of sync

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails with TypeScript errors

```bash
# Check for type errors without building
npx tsc --noEmit
```

### Styles not updating

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Browser Compatibility

The demo uses modern CSS and JavaScript features. Tested on:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Network Access

To share the demo with others on your local network:

```bash
npm run dev -- --host
```

This exposes the server on your network IP (shown in terminal output).

## Environment Variables

No environment variables are required for the demo. All functionality is simulated client-side.

---

## Next Steps

Once you've verified the demo works locally:

1. Review the [Presentation Script](./PRESENTATION_SCRIPT.md) for walkthrough guidance
2. Customize content in `src/components/demo/` as needed
3. Deploy to GitHub Pages for sharing with stakeholders
