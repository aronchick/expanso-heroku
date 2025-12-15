import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface ArchitectureDiagramProps {
  scenario: 'smart-city' | 'utility'
  onComponentClick?: (component: string) => void
  activeComponent?: string
}

export function ArchitectureDiagram({
  scenario,
  onComponentClick,
  activeComponent,
}: ArchitectureDiagramProps) {
  const [dataPacketPosition, setDataPacketPosition] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setDataPacketPosition((prev) => (prev + 1) % 5)
    }, 1500)

    return () => clearInterval(interval)
  }, [isAnimating])

  const components = scenario === 'smart-city'
    ? smartCityComponents
    : utilityComponents

  return (
    <div className="relative bg-muted/30 rounded-xl p-6 md:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Architecture Overview</h3>
          <p className="text-sm text-muted-foreground">
            Click any component to learn more
          </p>
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="text-xs px-3 py-1 rounded-full bg-background border hover:bg-muted transition-colors"
        >
          {isAnimating ? '⏸ Pause' : '▶ Play'} Animation
        </button>
      </div>

      {/* Architecture Grid */}
      <div className="grid grid-cols-3 gap-4 md:gap-8">
        {/* Edge Layer */}
        <div className="space-y-4">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            Edge Layer
          </Badge>
          {components.edge.map((comp) => (
            <ComponentBox
              key={comp.id}
              {...comp}
              isActive={activeComponent === comp.id}
              isHighlighted={dataPacketPosition === comp.flowStep}
              onClick={() => onComponentClick?.(comp.id)}
            />
          ))}
        </div>

        {/* Cloud Layer */}
        <div className="space-y-4">
          <Badge variant="outline" className="bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30">
            Cloud Layer
          </Badge>
          {components.cloud.map((comp) => (
            <ComponentBox
              key={comp.id}
              {...comp}
              isActive={activeComponent === comp.id}
              isHighlighted={dataPacketPosition === comp.flowStep}
              onClick={() => onComponentClick?.(comp.id)}
            />
          ))}
        </div>

        {/* Action Layer */}
        <div className="space-y-4">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Action Layer
          </Badge>
          {components.action.map((comp) => (
            <ComponentBox
              key={comp.id}
              {...comp}
              isActive={activeComponent === comp.id}
              isHighlighted={dataPacketPosition === comp.flowStep}
              onClick={() => onComponentClick?.(comp.id)}
            />
          ))}
        </div>
      </div>

      {/* Data Flow Indicator */}
      <div className="mt-6 pt-6 border-t">
        <DataFlowIndicator position={dataPacketPosition} scenario={scenario} />
      </div>
    </div>
  )
}

interface ComponentBoxProps {
  id: string
  name: string
  type: string
  description: string
  icon: string
  isActive: boolean
  isHighlighted: boolean
  onClick: () => void
}

function ComponentBox({
  name,
  type,
  description,
  icon,
  isActive,
  isHighlighted,
  onClick,
}: ComponentBoxProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-lg border bg-background transition-all
        hover:shadow-md hover:border-primary/50
        ${isActive ? 'ring-2 ring-primary border-primary' : ''}
        ${isHighlighted ? 'animate-pulse border-primary/50 shadow-lg shadow-primary/20' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="min-w-0">
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{type}</div>
          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {description}
          </div>
        </div>
      </div>
    </button>
  )
}

function DataFlowIndicator({
  position,
  scenario,
}: {
  position: number
  scenario: 'smart-city' | 'utility'
}) {
  const steps = scenario === 'smart-city'
    ? [
        { label: 'Video Stream', data: '30 fps • 1080p' },
        { label: 'ML Processing', data: 'Person detection' },
        { label: 'JSON Packet', data: '{"count": 5, "ts": "..."}' },
        { label: 'Postgres Insert', data: 'traffic_counts table' },
        { label: 'Dashboard Update', data: 'Real-time visualization' },
      ]
    : [
        { label: 'Raw Telemetry', data: '25k metrics/sec' },
        { label: 'Anomaly Detection', data: 'Voltage drop detected' },
        { label: 'Correlation Query', data: 'Affected: 4 households' },
        { label: 'Heroku Connect Sync', data: 'Service Asset lookup' },
        { label: 'Ticket Created', data: 'Priority 1 • Auto-assigned' },
      ]

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`
              flex flex-col items-center transition-all duration-300
              ${position === i ? 'scale-110' : 'opacity-50'}
            `}
          >
            <div
              className={`
                w-3 h-3 rounded-full transition-colors
                ${position === i ? 'bg-primary' : 'bg-muted-foreground/30'}
                ${position > i ? 'bg-emerald-500' : ''}
              `}
            />
            <div className="text-xs font-medium mt-2 text-center max-w-[100px]">
              {step.label}
            </div>
            <div className="text-[10px] text-muted-foreground text-center max-w-[100px]">
              {step.data}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`
                w-8 md:w-16 h-0.5 mx-1 transition-colors
                ${position > i ? 'bg-emerald-500' : 'bg-muted-foreground/20'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Component configurations
const smartCityComponents = {
  edge: [
    {
      id: 'camera',
      name: 'IP Camera',
      type: 'Data Source',
      description: 'Standard security camera streaming 1080p video',
      icon: '📹',
      flowStep: 0,
    },
    {
      id: 'expanso-agent',
      name: 'Expanso Agent',
      type: 'Edge Processor',
      description: 'Runs on Raspberry Pi, executes ML model locally',
      icon: '🔧',
      flowStep: 1,
    },
  ],
  cloud: [
    {
      id: 'heroku-postgres',
      name: 'Heroku Postgres',
      type: 'Database',
      description: 'Stores aggregated count data, time-series optimized',
      icon: '🐘',
      flowStep: 3,
    },
    {
      id: 'heroku-app',
      name: 'Heroku App',
      type: 'API + Dashboard',
      description: 'REST API and React dashboard for visualization',
      icon: '☁️',
      flowStep: 2,
    },
  ],
  action: [
    {
      id: 'dashboard',
      name: 'Traffic Dashboard',
      type: 'Visualization',
      description: 'Real-time charts showing foot traffic trends',
      icon: '📊',
      flowStep: 4,
    },
    {
      id: 'alerts',
      name: 'Alert System',
      type: 'Notifications',
      description: 'Triggers when thresholds exceeded',
      icon: '🔔',
      flowStep: 4,
    },
  ],
}

const utilityComponents = {
  edge: [
    {
      id: 'smart-meters',
      name: 'Smart Meters',
      type: 'IoT Devices',
      description: 'Millions of meters sending voltage readings',
      icon: '⚡',
      flowStep: 0,
    },
    {
      id: 'expanso-gateway',
      name: 'Expanso Gateway',
      type: 'Edge Aggregator',
      description: 'Cleans, batches, and forwards standardized metrics',
      icon: '🔧',
      flowStep: 1,
    },
  ],
  cloud: [
    {
      id: 'heroku-postgres-util',
      name: 'Heroku Postgres',
      type: 'Time-Series DB',
      description: 'Stores metrics with customer correlation tables',
      icon: '🐘',
      flowStep: 2,
    },
    {
      id: 'heroku-detector',
      name: 'Anomaly Detector',
      type: 'Python/Go App',
      description: 'Analyzes patterns, identifies outages vs single failures',
      icon: '🔍',
      flowStep: 2,
    },
    {
      id: 'heroku-connect',
      name: 'Heroku Connect',
      type: 'Salesforce Sync',
      description: 'Bi-directional sync with Service Cloud',
      icon: '🔄',
      flowStep: 3,
    },
  ],
  action: [
    {
      id: 'salesforce',
      name: 'Service Cloud',
      type: 'CRM',
      description: 'Auto-creates Priority 1 tickets with asset context',
      icon: '☁️',
      flowStep: 4,
    },
    {
      id: 'slack',
      name: 'Slack Notification',
      type: 'Team Alert',
      description: 'Posts to #field-ops with ticket details',
      icon: '💬',
      flowStep: 4,
    },
  ],
}
