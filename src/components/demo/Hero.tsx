import { Badge } from '@/components/ui/badge'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Heroku + Expanso Integration Demo
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Real-World to Record
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            Where{' '}
            <span className="text-foreground font-semibold">edge intelligence</span>
            {' '}meets{' '}
            <span className="text-foreground font-semibold">enterprise action</span>.
            Transform raw IoT data into business outcomes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <FlowStep
              number={1}
              title="Edge"
              subtitle="Expanso"
              description="Collect & Filter"
              color="emerald"
            />
            <FlowArrow />
            <FlowStep
              number={2}
              title="Cloud"
              subtitle="Heroku"
              description="Process & Correlate"
              color="violet"
            />
            <FlowArrow />
            <FlowStep
              number={3}
              title="Record"
              subtitle="Salesforce"
              description="Act & Automate"
              color="blue"
            />
          </div>

          <p className="text-sm text-muted-foreground max-w-xl">
            Explore two real-world scenarios that demonstrate how this architecture
            solves complex enterprise challenges—from privacy-first smart cities
            to proactive utility services.
          </p>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl translate-y-1/2" />
    </section>
  )
}

function FlowStep({
  number,
  title,
  subtitle,
  description,
  color,
}: {
  number: number
  title: string
  subtitle: string
  description: string
  color: 'emerald' | 'violet' | 'blue'
}) {
  const colorClasses = {
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
  }

  return (
    <div className={`flex flex-col items-center p-4 rounded-xl border ${colorClasses[color]}`}>
      <div className="text-xs font-medium opacity-70 mb-1">Step {number}</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm font-medium">{subtitle}</div>
      <div className="text-xs opacity-70 mt-1">{description}</div>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex items-center text-muted-foreground/50">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  )
}
