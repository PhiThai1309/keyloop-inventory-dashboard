import { Badge } from '@/components/ui/badge'

interface AgingStockBadgeProps {
  days: number
  threshold?: number
}

export function AgingStockBadge({ days, threshold = 90 }: AgingStockBadgeProps) {
  const isAging = days > threshold

  if (!isAging) {
    return <span className="text-sm text-gray-500">{days} days</span>
  }

  return (
    <Badge variant="destructive" className="animate-pulse">
      {days} days (Aging)
    </Badge>
  )
}
