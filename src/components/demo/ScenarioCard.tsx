import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ScenarioCardProps {
  id: string
  title: string
  subtitle: string
  description: string
  benefits: string[]
  icon: React.ReactNode
  color: 'emerald' | 'amber'
  onSelect: (id: string) => void
  isActive: boolean
}

export function ScenarioCard({
  id,
  title,
  subtitle,
  description,
  benefits,
  icon,
  color,
  onSelect,
  isActive,
}: ScenarioCardProps) {
  const colorClasses = {
    emerald: {
      border: isActive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : '',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: 'text-emerald-500',
    },
    amber: {
      border: isActive ? 'border-amber-500 ring-2 ring-amber-500/20' : '',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: 'text-amber-500',
    },
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${colorClasses[color].border}`}
      onClick={() => onSelect(id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${colorClasses[color].badge}`}>
            {icon}
          </div>
          <Badge variant="outline" className={colorClasses[color].badge}>
            {subtitle}
          </Badge>
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <svg
                className={`w-4 h-4 ${colorClasses[color].icon}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isActive ? 'default' : 'outline'}>
          {isActive ? 'Currently Viewing' : 'Explore This Scenario'}
        </Button>
      </CardFooter>
    </Card>
  )
}
