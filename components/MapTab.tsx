import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { theme } from '@/styles/theme'

export default function MapTab() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle style={{ color: theme.colors.primary }}>Map Your Progress</CardTitle>
        <CardDescription>Visualize your journey and track your growth</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Map functionality will be implemented in the next phase.</p>
      </CardContent>
    </Card>
  )
}

