import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BreakpointsProps {
  breakpoints: { [key: string]: number }
  onChange: (breakpoints: { [key: string]: number }) => void
}

export function Breakpoints({ breakpoints, onChange }: BreakpointsProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...breakpoints, [key]: parseInt(value) || 0 })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Breakpoints</h2>
      {Object.entries(breakpoints).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Label htmlFor={key} className="w-20">
            {key}:
          </Label>
          <Input
            id={key}
            type="number"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

