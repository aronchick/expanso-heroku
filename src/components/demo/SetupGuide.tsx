import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface SetupGuideProps {
  scenario: 'smart-city' | 'utility'
}

export function SetupGuide({ scenario }: SetupGuideProps) {
  const guides = scenario === 'smart-city' ? smartCityGuides : utilityGuides

  return (
    <div className="bg-muted/30 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Setup Guide</h3>
        <p className="text-sm text-muted-foreground">
          Step-by-step configuration for each component
        </p>
      </div>

      <Tabs defaultValue={guides[0].id} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {guides.map((guide) => (
            <TabsTrigger key={guide.id} value={guide.id} className="gap-2">
              <span>{guide.icon}</span>
              <span className="hidden sm:inline">{guide.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {guides.map((guide) => (
          <TabsContent key={guide.id} value={guide.id} className="mt-4">
            <GuideContent guide={guide} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface Guide {
  id: string
  name: string
  icon: string
  description: string
  steps: {
    title: string
    description: string
    code?: string
    language?: string
  }[]
}

function GuideContent({ guide }: { guide: Guide }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
        <span className="text-2xl">{guide.icon}</span>
        <div>
          <h4 className="font-semibold">{guide.name}</h4>
          <p className="text-sm text-muted-foreground">{guide.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {guide.steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium">{step.title}</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
                {step.code && (
                  <div className="mt-3 relative">
                    <div className="flex items-center justify-between bg-zinc-900 dark:bg-zinc-950 rounded-t-lg px-4 py-2 border border-b-0 border-zinc-700">
                      <Badge variant="outline" className="text-xs bg-zinc-800 text-zinc-300 border-zinc-600">
                        {step.language || 'bash'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs text-zinc-400 hover:text-zinc-100"
                        onClick={() => copyToClipboard(step.code!, index)}
                      >
                        {copiedIndex === index ? '✓ Copied' : 'Copy'}
                      </Button>
                    </div>
                    <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-b-lg p-4 overflow-x-auto border border-t-0 border-zinc-700">
                      <code className="text-sm text-zinc-100 font-mono whitespace-pre">
                        {step.code}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const smartCityGuides: Guide[] = [
  {
    id: 'expanso',
    name: 'Expanso Agent',
    icon: '🔧',
    description: 'Configure the edge agent to process video and count people',
    steps: [
      {
        title: 'Install Expanso on Raspberry Pi',
        description: 'Download and install the Expanso agent on your edge device',
        code: `# Install Expanso agent
curl -sSL https://get.expanso.io | sh

# Verify installation
expanso --version`,
        language: 'bash',
      },
      {
        title: 'Configure the ML Pipeline',
        description: 'Set up the person detection model and output format',
        code: `# expanso.yaml
pipeline:
  name: traffic-counter
  source:
    type: rtsp
    url: rtsp://camera.local:554/stream

  processors:
    - type: ml-inference
      model: yolov8n-pose
      task: person-detection

    - type: aggregator
      window: 60s
      output:
        - field: person_count
          aggregation: max

  sink:
    type: http
    url: https://your-app.herokuapp.com/api/counts
    batch_size: 10
    format: json`,
        language: 'yaml',
      },
      {
        title: 'Start the Agent',
        description: 'Run the pipeline and verify data is flowing',
        code: `# Start the pipeline
expanso run --config expanso.yaml

# Check status
expanso status`,
        language: 'bash',
      },
    ],
  },
  {
    id: 'heroku',
    name: 'Heroku App',
    icon: '☁️',
    description: 'Deploy the API and dashboard application',
    steps: [
      {
        title: 'Create Heroku App with Postgres',
        description: 'Set up the application and database',
        code: `# Create the app
heroku create smart-city-traffic

# Add Postgres
heroku addons:create heroku-postgresql:essential-0

# Set environment variables
heroku config:set NODE_ENV=production`,
        language: 'bash',
      },
      {
        title: 'Create Database Schema',
        description: 'Set up the table for traffic counts',
        code: `-- Create traffic_counts table
CREATE TABLE traffic_counts (
  id SERIAL PRIMARY KEY,
  location_id VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  person_count INTEGER NOT NULL,

  -- Indexes for time-series queries
  INDEX idx_location_time (location_id, timestamp DESC)
);

-- Create materialized view for hourly aggregates
CREATE MATERIALIZED VIEW hourly_traffic AS
SELECT
  location_id,
  date_trunc('hour', timestamp) as hour,
  AVG(person_count) as avg_count,
  MAX(person_count) as peak_count
FROM traffic_counts
GROUP BY location_id, date_trunc('hour', timestamp);`,
        language: 'sql',
      },
      {
        title: 'Deploy the Application',
        description: 'Push your code to Heroku',
        code: `# Deploy
git push heroku main

# Verify
heroku open`,
        language: 'bash',
      },
    ],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '📊',
    description: 'Configure the visualization dashboard',
    steps: [
      {
        title: 'Dashboard Configuration',
        description: 'Set up the traffic visualization panel',
        code: `// Dashboard widget configuration
{
  "widgets": [
    {
      "type": "time-series",
      "title": "Foot Traffic Over Time",
      "query": "SELECT * FROM hourly_traffic WHERE hour > NOW() - INTERVAL '24 hours'",
      "refresh": "5m"
    },
    {
      "type": "heatmap",
      "title": "Traffic Heatmap",
      "query": "SELECT location_id, hour, avg_count FROM hourly_traffic",
      "colorScale": ["#10b981", "#f59e0b", "#ef4444"]
    }
  ]
}`,
        language: 'json',
      },
    ],
  },
]

const utilityGuides: Guide[] = [
  {
    id: 'expanso',
    name: 'Expanso Gateway',
    icon: '🔧',
    description: 'Configure the gateway to ingest and standardize meter data',
    steps: [
      {
        title: 'Install Expanso Gateway',
        description: 'Deploy the gateway on your data center edge',
        code: `# Install gateway package
curl -sSL https://get.expanso.io/gateway | sh

# Initialize with your org key
expanso-gateway init --org-key=$EXPANSO_ORG_KEY`,
        language: 'bash',
      },
      {
        title: 'Configure Meter Ingestion',
        description: 'Set up the pipeline for smart meter telemetry',
        code: `# expanso-gateway.yaml
ingestion:
  name: utility-meters
  sources:
    - type: mqtt
      broker: mqtt://meter-gateway.local:1883
      topics:
        - meters/+/voltage
        - meters/+/current

  transform:
    # Standardize units
    - type: unit-conversion
      field: voltage
      from: raw
      to: volts

    # Add metadata
    - type: enrich
      lookup:
        table: meter_registry
        key: meter_id
        fields: [customer_id, location, circuit]

    # Filter noise
    - type: filter
      condition: "abs(voltage - 120) > 5"  # Only anomalies

  output:
    type: postgres
    connection: $HEROKU_DATABASE_URL
    table: meter_readings
    batch_size: 1000
    flush_interval: 10s`,
        language: 'yaml',
      },
      {
        title: 'Start the Gateway',
        description: 'Run and monitor the ingestion pipeline',
        code: `# Start gateway
expanso-gateway start

# Monitor throughput
expanso-gateway stats --live`,
        language: 'bash',
      },
    ],
  },
  {
    id: 'heroku',
    name: 'Heroku Setup',
    icon: '☁️',
    description: 'Configure Heroku Postgres and the anomaly detection app',
    steps: [
      {
        title: 'Create App with Premium Postgres',
        description: 'High-performance database for time-series workloads',
        code: `# Create app
heroku create utility-anomaly-detector

# Add high-performance Postgres
heroku addons:create heroku-postgresql:standard-0

# Enable connection pooling
heroku addons:create heroku-postgres-pgbouncer`,
        language: 'bash',
      },
      {
        title: 'Database Schema',
        description: 'Tables for meter readings and customer correlation',
        code: `-- Meter readings (partitioned by time)
CREATE TABLE meter_readings (
  id BIGSERIAL,
  meter_id VARCHAR(20) NOT NULL,
  customer_id VARCHAR(20),
  timestamp TIMESTAMPTZ NOT NULL,
  voltage DECIMAL(6,2),
  circuit VARCHAR(50),

  PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Create partitions
CREATE TABLE meter_readings_current PARTITION OF meter_readings
  FOR VALUES FROM (CURRENT_DATE) TO (CURRENT_DATE + 1);

-- Anomaly events (synced to Salesforce)
CREATE TABLE anomaly_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50),
  severity VARCHAR(20),
  affected_meters TEXT[],
  affected_customers TEXT[],
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  salesforce_case_id VARCHAR(20),
  status VARCHAR(20) DEFAULT 'new'
);`,
        language: 'sql',
      },
      {
        title: 'Deploy Anomaly Detector',
        description: 'Python app that analyzes patterns',
        code: `# anomaly_detector.py
import os
from datetime import datetime, timedelta
import psycopg2

def detect_neighborhood_outage():
    """
    Identifies when multiple nearby meters
    report voltage drops simultaneously
    """
    conn = psycopg2.connect(os.environ['DATABASE_URL'])

    # Find voltage drops in last 5 minutes
    query = """
    WITH recent_anomalies AS (
      SELECT meter_id, customer_id, circuit,
             AVG(voltage) as avg_voltage
      FROM meter_readings
      WHERE timestamp > NOW() - INTERVAL '5 minutes'
        AND voltage < 110  -- Below normal
      GROUP BY meter_id, customer_id, circuit
    )
    SELECT circuit,
           array_agg(meter_id) as affected_meters,
           array_agg(customer_id) as affected_customers,
           COUNT(*) as affected_count
    FROM recent_anomalies
    GROUP BY circuit
    HAVING COUNT(*) >= 3  -- Neighborhood = 3+ affected
    """

    # Create anomaly events for correlation
    # These sync to Salesforce via Heroku Connect
    ...`,
        language: 'python',
      },
    ],
  },
  {
    id: 'heroku-connect',
    name: 'Heroku Connect',
    icon: '🔄',
    description: 'Bi-directional sync with Salesforce Service Cloud',
    steps: [
      {
        title: 'Add Heroku Connect',
        description: 'Enable Salesforce integration',
        code: `# Add Heroku Connect addon
heroku addons:create herokuconnect:demo

# Open configuration dashboard
heroku addons:open herokuconnect`,
        language: 'bash',
      },
      {
        title: 'Configure Mapping',
        description: 'Map Postgres tables to Salesforce objects',
        code: `{
  "mappings": [
    {
      "postgres_table": "anomaly_events",
      "salesforce_object": "Case",
      "direction": "postgres_to_salesforce",
      "field_mappings": {
        "event_type": "Type",
        "severity": "Priority",
        "detected_at": "CreatedDate",
        "affected_customers": "Description"
      },
      "triggers": {
        "on_insert": true,
        "priority_mapping": {
          "critical": "Priority 1",
          "warning": "Priority 2"
        }
      }
    },
    {
      "postgres_table": "customer_assets",
      "salesforce_object": "Asset",
      "direction": "salesforce_to_postgres",
      "sync_interval": "10m"
    }
  ]
}`,
        language: 'json',
      },
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: '☁️',
    description: 'Service Cloud automation configuration',
    steps: [
      {
        title: 'Case Auto-Assignment Rule',
        description: 'Automatically route tickets to field ops',
        code: `<!-- Assignment Rule: Utility Outage -->
<AssignmentRule>
  <name>Outage_Auto_Assignment</name>
  <active>true</active>
  <criteria>
    <field>Case.Type</field>
    <operation>equals</operation>
    <value>neighborhood_outage</value>
  </criteria>
  <assignTo>
    <type>Queue</type>
    <name>Field_Operations</name>
  </assignTo>
  <notification>
    <template>Outage_Alert_Template</template>
    <notifyOwner>true</notifyOwner>
  </notification>
</AssignmentRule>`,
        language: 'xml',
      },
      {
        title: 'Slack Integration (Flow)',
        description: 'Post to #field-ops when Priority 1 cases created',
        code: `// Salesforce Flow: Post to Slack
// Trigger: Case.Priority = 'Priority 1' AND Case.Type CONTAINS 'outage'

// Action: HTTP Callout to Slack Webhook
{
  "webhook_url": "$SLACK_WEBHOOK_URL",
  "payload": {
    "channel": "#field-ops",
    "username": "Service Cloud Bot",
    "icon_emoji": ":zap:",
    "text": "🚨 *Priority 1 Alert*",
    "attachments": [{
      "color": "danger",
      "fields": [
        {"title": "Case", "value": "{!Case.CaseNumber}", "short": true},
        {"title": "Type", "value": "{!Case.Type}", "short": true},
        {"title": "Affected Area", "value": "{!Case.Circuit__c}"},
        {"title": "Customers Affected", "value": "{!Case.Affected_Count__c}"}
      ]
    }]
  }
}`,
        language: 'json',
      },
    ],
  },
]
