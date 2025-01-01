'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ColorSchemeProps {
  colorScheme: {
    primary: string
    secondary: string
    background: string
    text: string
  }
  onChange: (colorScheme: ColorSchemeProps['colorScheme']) => void
}

export function ColorScheme({ colorScheme, onChange }: ColorSchemeProps) {
  const handleChange = (key: keyof ColorSchemeProps['colorScheme'], value: string) => {
    onChange({ ...colorScheme, [key]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Color Scheme</h2>
      {Object.entries(colorScheme).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Label htmlFor={key} className="w-20 capitalize">
            {key}:
          </Label>
          <Input
            id={key}
            type="color"
            value={value}
            onChange={(e) => handleChange(key as keyof ColorSchemeProps['colorScheme'], e.target.value)}
            className="w-12 h-12 p-1 rounded-md"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => handleChange(key as keyof ColorSchemeProps['colorScheme'], e.target.value)}
            className="flex-grow"
          />
        </div>
      ))}
    </div>
  )
}

