# Heroku + Expanso Interactive Demo

An interactive demo showcasing the "Real-World to Record" architecture—where **Expanso** handles edge data processing and **Heroku** bridges it to **Salesforce** for enterprise action.

**Live Demo**: [https://daaronch.github.io/expanso-heroku/](https://daaronch.github.io/expanso-heroku/)

---

## What This Is

This is a **fully interactive prototype** (no backend services) that demonstrates two enterprise scenarios:

### Scenario A: Smart City Traffic Monitor
- **Problem**: Cities need foot traffic data but can't stream terabytes of video to the cloud
- **Solution**: Expanso runs ML at the edge, sends only counts (99.9% data reduction)
- **Outcome**: Real-time dashboard with zero privacy concerns

### Scenario B: Proactive Utility Service
- **Problem**: Utilities want to fix outages before customers call, but can't ingest 25k metrics/second into Salesforce
- **Solution**: Expanso filters noise at edge, Heroku correlates anomalies, Heroku Connect syncs to Service Cloud
- **Outcome**: Automatic ticket creation + Slack alerts before customers notice

---

## Features

- **Animated architecture diagrams** with live data flow visualization
- **Clickable components** showing capabilities, data in/out, and configuration
- **Simulated outcomes** (live dashboards, Salesforce tickets, Slack notifications)
- **Setup guides** with real configuration examples (Expanso YAML, SQL schemas, Heroku Connect mappings)
- **Dark mode** support
- **Mobile responsive**

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Run Locally
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173/expanso-heroku/](http://localhost:5173/expanso-heroku/)

### Build for Production
```bash
npm run build
npm run preview  # Preview the build
```

---

## Deploy to GitHub Pages

### Automatic (GitHub Actions)
1. Push to `main` branch
2. Go to repo **Settings → Pages → Source: GitHub Actions**
3. Wait ~2 minutes for deployment

### Manual
```bash
npm run build
# Deploy contents of dist/ to your hosting
```

---

## Project Structure

```
expanso-heroku/
├── src/
│   ├── App.tsx                      # Main application
│   ├── components/
│   │   ├── demo/
│   │   │   ├── Hero.tsx             # Landing section
│   │   │   ├── ScenarioCard.tsx     # Scenario selection
│   │   │   ├── ArchitectureDiagram.tsx  # Animated architecture
│   │   │   ├── ComponentDetail.tsx  # Component info panel
│   │   │   ├── SetupGuide.tsx       # Configuration examples
│   │   │   └── SimulatedOutcome.tsx # Dashboards & simulations
│   │   └── ui/                      # shadcn/ui components
│   └── lib/
│       └── utils.ts                 # Utility functions
├── docs/
│   ├── LOCAL_DEMO.md               # Local setup guide
│   └── PRESENTATION_SCRIPT.md      # Full demo walkthrough script
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
└── vite.config.ts                  # Vite configuration
```

---

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 4
- **Components**: [shadcn/ui](https://ui.shadcn.com)
- **Deployment**: GitHub Pages via GitHub Actions

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Customization

### Change the base URL
Edit `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // Change this
  // ...
})
```

### Add shadcn/ui components
```bash
npx shadcn@latest add [component-name]
```

### Modify scenario content
- Architecture components: `src/components/demo/ArchitectureDiagram.tsx`
- Component details: `src/components/demo/ComponentDetail.tsx`
- Setup guides: `src/components/demo/SetupGuide.tsx`
- Simulated outcomes: `src/components/demo/SimulatedOutcome.tsx`

---

## Presentation

See [`docs/PRESENTATION_SCRIPT.md`](docs/PRESENTATION_SCRIPT.md) for a complete 15-20 minute walkthrough script including:
- Opening hooks
- Section-by-section narration
- Q&A preparation
- Demo recovery tips

---

## License

Internal demo - not for public distribution.

---

## Next Steps

This demo showcases the **proposed architecture and user experience**. To build the real thing:

1. **Expanso**: Configure actual edge agents with ML pipelines
2. **Heroku**: Deploy Postgres + application code
3. **Heroku Connect**: Set up Salesforce sync mappings
4. **Salesforce**: Configure Service Cloud automation rules
