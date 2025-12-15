import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface SimulatedOutcomeProps {
  scenario: 'smart-city' | 'utility'
}

export function SimulatedOutcome({ scenario }: SimulatedOutcomeProps) {
  if (scenario === 'smart-city') {
    return <SmartCityDashboard />
  }
  return <UtilityOutcome />
}

function SmartCityDashboard() {
  const [counts, setCounts] = useState<number[]>([])
  const [currentCount, setCurrentCount] = useState(0)

  useEffect(() => {
    // Simulate real-time data
    const interval = setInterval(() => {
      const newCount = Math.floor(Math.random() * 15) + 5
      setCurrentCount(newCount)
      setCounts((prev) => [...prev.slice(-23), newCount])
    }, 2000)

    // Initialize with some data
    setCounts(Array.from({ length: 24 }, () => Math.floor(Math.random() * 15) + 5))

    return () => clearInterval(interval)
  }, [])

  const maxCount = Math.max(...counts, 1)
  const avgCount = counts.length ? Math.round(counts.reduce((a, b) => a + b, 0) / counts.length) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Live Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Simulated real-time traffic monitoring
          </p>
        </div>
        <Badge className="animate-pulse bg-emerald-500">● Live</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current</CardDescription>
            <CardTitle className="text-3xl">{currentCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">people detected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Peak Today</CardDescription>
            <CardTitle className="text-3xl">{maxCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">at 12:30 PM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>24h Average</CardDescription>
            <CardTitle className="text-3xl">{avgCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+12% vs yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Foot Traffic (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 gap-1">
            {counts.map((count, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/80 rounded-t transition-all duration-500"
                style={{ height: `${(count / maxCount) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Now</span>
          </div>
        </CardContent>
      </Card>

      {/* Data Savings */}
      <Card className="bg-emerald-500/5 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span>💾</span> Data Reduction Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Raw Video Data</div>
              <div className="text-2xl font-bold text-red-500">432 GB/day</div>
            </div>
            <div>
              <div className="text-muted-foreground">Actual Data Sent</div>
              <div className="text-2xl font-bold text-emerald-500">2.4 MB/day</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Data Reduction</span>
              <span className="font-medium">99.9994%</span>
            </div>
            <Progress value={99.9994} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground">
            Privacy preserved: No video leaves the device. Only anonymous counts are transmitted.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function UtilityOutcome() {
  const [stage, setStage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    if (stage < 5) {
      const timer = setTimeout(() => setStage((s) => s + 1), 2000)
      return () => clearTimeout(timer)
    } else {
      setIsPlaying(false)
    }
  }, [stage, isPlaying])

  const startDemo = () => {
    setStage(0)
    setIsPlaying(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Simulated Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Watch the proactive service pipeline in action
          </p>
        </div>
        <Button onClick={startDemo} disabled={isPlaying}>
          {isPlaying ? 'Running...' : '▶ Run Simulation'}
        </Button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <TimelineStep
          step={1}
          title="Anomaly Detected"
          description="Voltage drop detected across 4 meters in Sector 7"
          isActive={stage >= 1}
          isComplete={stage > 1}
          details={{
            meters: ['M-7234', 'M-7235', 'M-7236', 'M-7238'],
            voltage: '98.2V (normal: 120V)',
            time: '2:34:12 PM',
          }}
        />
        <TimelineStep
          step={2}
          title="Correlation Analysis"
          description="System determines this is a neighborhood outage, not individual failures"
          isActive={stage >= 2}
          isComplete={stage > 2}
          details={{
            query: 'SELECT circuit, COUNT(*) FROM recent_anomalies GROUP BY circuit',
            result: 'Circuit 7-B: 4 affected households',
            confidence: '94%',
          }}
        />
        <TimelineStep
          step={3}
          title="Heroku Connect Sync"
          description="Anomaly event synced to Salesforce Service Cloud"
          isActive={stage >= 3}
          isComplete={stage > 3}
          details={{
            object: 'Case (anomaly_events → Case)',
            direction: 'Postgres → Salesforce',
            latency: '1.2 seconds',
          }}
        />
        <TimelineStep
          step={4}
          title="Service Cloud Ticket"
          description="Priority 1 case auto-created and assigned to Field Operations"
          isActive={stage >= 4}
          isComplete={stage > 4}
        />
        <TimelineStep
          step={5}
          title="Slack Notification"
          description="Team alerted via #field-ops channel"
          isActive={stage >= 5}
          isComplete={stage > 5}
        />
      </div>

      {/* Salesforce Ticket Mock */}
      {stage >= 4 && (
        <Card className="border-blue-500/30 animate-in slide-in-from-bottom-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-500">Salesforce Service Cloud</Badge>
              <span className="text-xs text-muted-foreground">Case #00001994</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">Priority</div>
                <Badge variant="destructive">Priority 1</Badge>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Status</div>
                <Badge variant="outline">New</Badge>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Type</div>
                <span>Neighborhood Outage</span>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Queue</div>
                <span>Field Operations</span>
              </div>
            </div>
            <div className="pt-3 border-t">
              <div className="text-muted-foreground text-xs mb-1">Description</div>
              <p className="text-sm">
                Automated alert: Voltage anomaly detected affecting 4 households
                in Circuit 7-B, Sector 7. Meters affected: M-7234, M-7235, M-7236, M-7238.
                Average voltage: 98.2V (expected: 120V).
              </p>
            </div>
            <div className="pt-3 border-t">
              <div className="text-muted-foreground text-xs mb-1">Related Assets</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Transformer T-7B</Badge>
                <Badge variant="secondary">Circuit 7-B</Badge>
                <Badge variant="secondary">Substation Sub-7</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slack Notification Mock */}
      {stage >= 5 && (
        <Card className="bg-[#4A154B]/5 border-[#4A154B]/30 animate-in slide-in-from-bottom-4">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <span className="font-semibold text-sm">#field-ops</span>
              <Badge variant="outline" className="text-xs">Slack</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                SC
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Service Cloud Bot</span>
                  <span className="text-xs text-muted-foreground">2:34 PM</span>
                </div>
                <div className="mt-2 p-3 bg-background rounded border-l-4 border-red-500">
                  <div className="font-semibold text-sm">🚨 Priority 1 Alert</div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div><span className="text-muted-foreground">Case:</span> #00001994</div>
                    <div><span className="text-muted-foreground">Type:</span> Neighborhood Outage</div>
                    <div><span className="text-muted-foreground">Area:</span> Sector 7, Circuit 7-B</div>
                    <div><span className="text-muted-foreground">Affected:</span> 4 households</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    View Case
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Assign to Me
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Impact Summary */}
      {stage >= 5 && (
        <Card className="bg-amber-500/5 border-amber-500/20 animate-in slide-in-from-bottom-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span>⚡</span> Proactive Service Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-500">8 min</div>
                <div className="text-xs text-muted-foreground">Detection to Dispatch</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">0</div>
                <div className="text-xs text-muted-foreground">Customer Calls</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">99.9%</div>
                <div className="text-xs text-muted-foreground">Data Reduction</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              The truck is rolling before the customer picks up the phone.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface TimelineStepProps {
  step: number
  title: string
  description: string
  isActive: boolean
  isComplete: boolean
  details?: Record<string, string | string[]>
}

function TimelineStep({
  step,
  title,
  description,
  isActive,
  isComplete,
  details,
}: TimelineStepProps) {
  return (
    <div className={`flex gap-4 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      <div className="flex flex-col items-center">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            transition-colors duration-500
            ${isComplete ? 'bg-emerald-500 text-white' : ''}
            ${isActive && !isComplete ? 'bg-amber-500 text-white animate-pulse' : ''}
            ${!isActive ? 'bg-muted text-muted-foreground' : ''}
          `}
        >
          {isComplete ? '✓' : step}
        </div>
        <div className="w-0.5 h-full bg-muted mt-2" />
      </div>
      <div className="flex-1 pb-6">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        {details && isActive && (
          <div className="mt-2 p-3 bg-muted/50 rounded text-xs font-mono space-y-1 animate-in fade-in">
            {Object.entries(details).map(([key, value]) => (
              <div key={key}>
                <span className="text-muted-foreground">{key}: </span>
                <span>{Array.isArray(value) ? value.join(', ') : value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
