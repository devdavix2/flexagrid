import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface GridSystemProps {
  columns: number
  onChange: (columns: number) => void
}

export function GridSystem({ columns, onChange }: GridSystemProps) {
  return (
    <div className="space-y-4">
      <Label>Grid Columns: {columns}</Label>
      <Slider
        min={1}
        max={24}
        step={1}
        value={[columns]}
        onValueChange={(value) => onChange(value[0])}
      />
    </div>
  )
}

