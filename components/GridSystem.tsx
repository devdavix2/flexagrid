'use client'

import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

interface GridSystemProps {
  columns: number
  onChange: (columns: number) => void
}

export function GridSystem({ columns, onChange }: GridSystemProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Grid System</h2>
      <div className="space-y-2">
        <Label htmlFor="gridColumns">Grid Columns: {columns}</Label>
        <Slider
          id="gridColumns"
          min={1}
          max={24}
          step={1}
          value={[columns]}
          onValueChange={(value) => onChange(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="columnInput">Columns</Label>
        <Input
          id="columnInput"
          type="number"
          min={1}
          max={24}
          value={columns}
          onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        />
      </div>
    </div>
  )
}

