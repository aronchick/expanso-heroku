import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ComponentDetailProps {
  componentId: string | null
  scenario: 'smart-city' | 'utility'
  onClose: () => void
}

export function ComponentDetail({ componentId, onClose }: ComponentDetailProps) {
  if (!componentId) return null

  const details = getComponentDetails(componentId)
  if (!details) return null

  return (
    <Card className="animate-in slide-in-from-right-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{details.icon}</span>
            <div>
              <CardTitle className="text-lg">{details.name}</CardTitle>
              <CardDescription>{details.type}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{details.description}</p>

        <div>
          <h4 className="text-sm font-semibold mb-2">Key Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            {details.capabilities.map((cap, i) => (
              <Badge key={i} variant="secondary">{cap}</Badge>
            ))}
          </div>
        </div>

        {details.dataIn && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Data In</h4>
              <p className="text-xs text-muted-foreground">{details.dataIn}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Data Out</h4>
              <p className="text-xs text-muted-foreground">{details.dataOut}</p>
            </div>
          </div>
        )}

        {details.benefits && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Why This Matters</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {details.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {details.config && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Configuration Preview</h4>
            <pre className="text-xs bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-3 rounded-lg overflow-x-auto">
              {details.config}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ComponentDetails {
  name: string
  type: string
  icon: string
  description: string
  capabilities: string[]
  dataIn?: string
  dataOut?: string
  benefits?: string[]
  config?: string
}

function getComponentDetails(id: string): ComponentDetails | null {
  const allDetails: Record<string, ComponentDetails> = {
    // Smart City
    'camera': {
      name: 'IP Camera',
      type: 'Data Source',
      icon: '📹',
      description: 'Standard IP security camera streaming video via RTSP protocol. No special hardware required—works with existing infrastructure.',
      capabilities: ['1080p/30fps', 'RTSP Stream', 'Night Vision', 'Wide Angle'],
      dataIn: 'Physical world (light)',
      dataOut: '30 fps video stream (~50 Mbps)',
      benefits: [
        'Uses existing camera investments',
        'No proprietary hardware lock-in',
        'Standard protocols for easy integration',
      ],
    },
    'expanso-agent': {
      name: 'Expanso Agent',
      type: 'Edge Processor',
      icon: '🔧',
      description: 'Lightweight agent running on Raspberry Pi that processes video locally using ML inference. Discards video after processing—only sends aggregated counts.',
      capabilities: ['YOLOv8 Inference', 'Privacy Filter', 'Batch Aggregation', 'Offline Capable'],
      dataIn: 'Video stream (50 Mbps)',
      dataOut: 'JSON packets (~10 bytes/min)',
      benefits: [
        '99.9994% data reduction',
        'Privacy preserved at edge',
        'Works with intermittent connectivity',
        'Low-cost hardware ($50 Pi)',
      ],
      config: `pipeline:
  processors:
    - type: ml-inference
      model: yolov8n-pose
    - type: aggregator
      window: 60s`,
    },
    'heroku-postgres': {
      name: 'Heroku Postgres',
      type: 'Managed Database',
      icon: '🐘',
      description: 'Fully managed PostgreSQL database optimized for time-series traffic data. Automatic backups, scaling, and maintenance.',
      capabilities: ['Time-Series Optimized', 'Auto-Scaling', 'Connection Pooling', 'Point-in-Time Recovery'],
      dataIn: 'JSON packets (API)',
      dataOut: 'Query results (Dashboard)',
      benefits: [
        'No database administration',
        'Automatic failover',
        'Built-in analytics extensions',
      ],
    },
    'heroku-app': {
      name: 'Heroku App',
      type: 'API + Dashboard',
      icon: '☁️',
      description: 'Node.js/React application that receives data from edge agents and renders the traffic dashboard.',
      capabilities: ['REST API', 'Real-time WebSocket', 'React Dashboard', 'Alert Rules'],
      dataIn: 'Traffic counts (Edge)',
      dataOut: 'Visualizations (Browser)',
    },
    'dashboard': {
      name: 'Traffic Dashboard',
      type: 'Visualization',
      icon: '📊',
      description: 'Real-time visualization of foot traffic across all monitored locations. Shows trends, peaks, and anomalies.',
      capabilities: ['Time-Series Charts', 'Heatmaps', 'Trend Analysis', 'Export Reports'],
    },
    'alerts': {
      name: 'Alert System',
      type: 'Notifications',
      icon: '🔔',
      description: 'Configurable alerts when traffic exceeds thresholds or patterns change significantly.',
      capabilities: ['Threshold Alerts', 'Anomaly Detection', 'Email/SMS', 'Slack Integration'],
    },

    // Utility
    'smart-meters': {
      name: 'Smart Meters',
      type: 'IoT Devices',
      icon: '⚡',
      description: 'Millions of deployed smart meters reporting voltage, current, and power factor readings via MQTT.',
      capabilities: ['Voltage Monitoring', 'Current Sensing', 'Power Factor', 'Tamper Detection'],
      dataIn: 'Electrical grid',
      dataOut: '25,000 metrics/second (fleet)',
      benefits: [
        'Sub-second anomaly detection',
        'Individual meter granularity',
        'Bi-directional communication',
      ],
    },
    'expanso-gateway': {
      name: 'Expanso Gateway',
      type: 'Edge Aggregator',
      icon: '🔧',
      description: 'High-throughput gateway that ingests raw meter telemetry, standardizes formats, enriches with metadata, and filters noise before cloud transmission.',
      capabilities: ['MQTT Ingestion', 'Unit Conversion', 'Metadata Enrichment', 'Noise Filtering'],
      dataIn: '25,000 metrics/second',
      dataOut: '~500 meaningful events/second',
      benefits: [
        '98% noise reduction',
        'Standardized data format',
        'Customer correlation at edge',
        'Bandwidth optimization',
      ],
      config: `transform:
  - type: filter
    condition: "abs(voltage - 120) > 5"
  - type: enrich
    lookup: meter_registry`,
    },
    'heroku-postgres-util': {
      name: 'Heroku Postgres',
      type: 'Time-Series Database',
      icon: '🐘',
      description: 'High-performance Postgres with time-partitioned tables for efficient meter data storage and customer correlation queries.',
      capabilities: ['Time Partitioning', 'Parallel Queries', 'Connection Pooling', 'Customer Joins'],
      dataIn: 'Standardized metrics',
      dataOut: 'Anomaly events + context',
    },
    'heroku-detector': {
      name: 'Anomaly Detector',
      type: 'Python/Go Application',
      icon: '🔍',
      description: 'Analyzes meter patterns to distinguish between individual failures and neighborhood outages. Correlates affected meters to circuits and customers.',
      capabilities: ['Pattern Recognition', 'Spatial Correlation', 'Customer Mapping', 'Event Classification'],
      dataIn: 'Meter readings',
      dataOut: 'Classified anomaly events',
      config: `# Detect neighborhood outage
SELECT circuit, COUNT(*)
FROM recent_anomalies
GROUP BY circuit
HAVING COUNT(*) >= 3`,
    },
    'heroku-connect': {
      name: 'Heroku Connect',
      type: 'Salesforce Sync',
      icon: '🔄',
      description: 'Bi-directional data sync between Heroku Postgres and Salesforce. Maps anomaly events to Cases, syncs Service Assets back to Postgres.',
      capabilities: ['Bi-directional Sync', 'Field Mapping', 'Trigger Rules', 'Conflict Resolution'],
      dataIn: 'anomaly_events table',
      dataOut: 'Salesforce Cases',
      benefits: [
        'No custom integration code',
        'Sub-second sync latency',
        'Automatic retry/recovery',
        'Full audit trail',
      ],
    },
    'salesforce': {
      name: 'Service Cloud',
      type: 'CRM',
      icon: '☁️',
      description: 'Salesforce Service Cloud receives anomaly events as Cases with full customer context. Auto-assigns to Field Operations queue.',
      capabilities: ['Case Management', 'Asset Tracking', 'Auto-Assignment', 'SLA Tracking'],
      dataIn: 'Anomaly events (via Connect)',
      dataOut: 'Field service dispatch',
      benefits: [
        'Full customer 360 view',
        'Automated workflows',
        'Mobile field service app',
        'SLA compliance tracking',
      ],
    },
    'slack': {
      name: 'Slack Notification',
      type: 'Team Collaboration',
      icon: '💬',
      description: 'Salesforce Flow triggers Slack webhook when Priority 1 cases are created. Field ops team gets instant visibility.',
      capabilities: ['Instant Alerts', 'Rich Formatting', 'Action Buttons', 'Thread Updates'],
      benefits: [
        'Immediate team awareness',
        'One-click case assignment',
        'Mobile notifications',
        'Reduced response time',
      ],
    },
  }

  return allDetails[id] || null
}
