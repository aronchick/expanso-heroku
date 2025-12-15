import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Hero } from '@/components/demo/Hero'
import { ScenarioCard } from '@/components/demo/ScenarioCard'
import { ArchitectureDiagram } from '@/components/demo/ArchitectureDiagram'
import { SetupGuide } from '@/components/demo/SetupGuide'
import { SimulatedOutcome } from '@/components/demo/SimulatedOutcome'
import { ComponentDetail } from '@/components/demo/ComponentDetail'

type Scenario = 'smart-city' | 'utility'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeScenario, setActiveScenario] = useState<Scenario>('smart-city')
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔌</span>
              <span className="font-bold">Expanso</span>
            </div>
            <span className="text-muted-foreground">×</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">☁️</span>
              <span className="font-bold">Heroku</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://expanso.io" target="_blank" rel="noopener noreferrer">
                Expanso Docs
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://heroku.com" target="_blank" rel="noopener noreferrer">
                Heroku Docs
              </a>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero />

      {/* Scenario Selection */}
      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Choose a Scenario</h2>
          <p className="text-muted-foreground">
            Explore two real-world use cases that showcase the power of edge-to-cloud integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ScenarioCard
            id="smart-city"
            title="Smart City Traffic Monitor"
            subtitle="Privacy-First"
            description="Count foot traffic at intersections without streaming video. Perfect for cities and retailers concerned about privacy and bandwidth."
            benefits={[
              '99.9% data reduction at edge',
              'No video leaves the device',
              'Real-time dashboard',
              'Low-cost hardware ($50 Pi)',
            ]}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            color="emerald"
            onSelect={() => setActiveScenario('smart-city')}
            isActive={activeScenario === 'smart-city'}
          />
          <ScenarioCard
            id="utility"
            title="Proactive Utility Service"
            subtitle="Anomaly Detector"
            description="Fix outages before customers call. Correlate smart meter data to distinguish individual failures from neighborhood blackouts."
            benefits={[
              'Truck rolls before the call',
              'Automated ticket creation',
              'Salesforce integration',
              'Slack team notifications',
            ]}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            color="amber"
            onSelect={() => setActiveScenario('utility')}
            isActive={activeScenario === 'utility'}
          />
        </div>
      </section>

      <Separator className="my-4" />

      {/* Scenario Deep Dive */}
      <section className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {activeScenario === 'smart-city'
              ? '🏙️ Smart City Traffic Monitor'
              : '⚡ Proactive Utility Service'}
          </h2>
          <p className="text-muted-foreground">
            {activeScenario === 'smart-city'
              ? 'Privacy-preserving foot traffic analysis with 99.9% data reduction'
              : 'Intelligent outage detection with automated service dispatch'}
          </p>
        </div>

        {/* Problem Statement */}
        <div className="mb-12 p-6 bg-destructive/5 border border-destructive/20 rounded-xl">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <span>🎯</span> The Problem
          </h3>
          {activeScenario === 'smart-city' ? (
            <p className="text-muted-foreground">
              The City of Bellevue needs to count foot traffic at intersections to optimize staffing and safety.
              They have cameras, but <strong className="text-foreground">cannot stream terabytes of raw video</strong> to the cloud
              due to <strong className="text-foreground">bandwidth costs</strong> and <strong className="text-foreground">privacy concerns</strong>.
              Traditional solutions require expensive cloud storage and raise GDPR/CCPA compliance issues.
            </p>
          ) : (
            <p className="text-muted-foreground">
              A large energy utility wants to <strong className="text-foreground">fix outages before customers call</strong>.
              They have millions of smart meters sending <strong className="text-foreground">25,000 metrics per second</strong>,
              but need to correlate this data with customer records to distinguish between{' '}
              <strong className="text-foreground">a single broken meter</strong> and{' '}
              <strong className="text-foreground">a neighborhood-wide blackout</strong>.
              Salesforce can't ingest this volume directly.
            </p>
          )}
        </div>

        {/* Architecture + Component Detail */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <ArchitectureDiagram
              scenario={activeScenario}
              onComponentClick={setActiveComponent}
              activeComponent={activeComponent || undefined}
            />
          </div>
          <div>
            {activeComponent ? (
              <ComponentDetail
                componentId={activeComponent}
                scenario={activeScenario}
                onClose={() => setActiveComponent(null)}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8 bg-muted/30 rounded-xl border border-dashed">
                <p className="text-sm text-muted-foreground text-center">
                  👆 Click any component in the architecture diagram to see details
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Setup & Outcome */}
        <Tabs defaultValue="outcome" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="outcome">📊 See It In Action</TabsTrigger>
            <TabsTrigger value="setup">🔧 Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="outcome" className="mt-6">
            <SimulatedOutcome scenario={activeScenario} />
          </TabsContent>

          <TabsContent value="setup" className="mt-6">
            <SetupGuide scenario={activeScenario} />
          </TabsContent>
        </Tabs>
      </section>

      {/* Benefits Summary */}
      <section className="bg-muted/30 border-t">
        <div className="container mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Why This Architecture Matters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The combination of Expanso and Heroku solves the fundamental challenge of
              getting real-world data into enterprise systems of record.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <BenefitCard
              icon="🔌"
              title="For Expanso"
              benefits={[
                'Validates the "System Agent" model',
                'Proves enterprise-grade data handling',
                'Showcases Salesforce ecosystem integration',
                'Demonstrates edge intelligence value',
              ]}
            />
            <BenefitCard
              icon="☁️"
              title="For Heroku"
              benefits={[
                'Expands "Service Demo" portfolio',
                'Unlocks IoT & Edge data use cases',
                'Highlights Postgres + Connect power',
                'Shows complex data correlation',
              ]}
            />
            <BenefitCard
              icon="💼"
              title="For Customers"
              benefits={[
                'Proactive instead of reactive service',
                'Massive data/bandwidth reduction',
                'Privacy-first architecture',
                'No custom integration code',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-4">
            <strong className="text-foreground">This is an interactive demo.</strong>
            {' '}No actual services are connected—this showcases the proposed architecture and user experience.
          </p>
          <p>
            Built with{' '}
            <a href="https://ui.shadcn.com" className="underline hover:text-foreground">shadcn/ui</a>
            {' • '}
            <a href="https://vitejs.dev" className="underline hover:text-foreground">Vite</a>
            {' • '}
            <a href="https://react.dev" className="underline hover:text-foreground">React</a>
            {' • '}
            Deployed on <a href="https://pages.github.com" className="underline hover:text-foreground">GitHub Pages</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

function BenefitCard({
  icon,
  title,
  benefits,
}: {
  icon: string
  title: string
  benefits: string[]
}) {
  return (
    <div className="p-6 bg-background rounded-xl border">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-emerald-500 mt-0.5">✓</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
