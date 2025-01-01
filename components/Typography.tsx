'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TypographyProps {
  typography: {
    fontFamily: string
    fontSize: string
    lineHeight: string
  }
  onChange: (typography: TypographyProps['typography']) => void
}

export function Typography({ typography, onChange }: TypographyProps) {
  const handleChange = (key: keyof TypographyProps['typography'], value: string) => {
    onChange({ ...typography, [key]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Typography</h2>
      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font Family</Label>
        <Select
          value={typography.fontFamily}
          onValueChange={(value) => handleChange('fontFamily', value)}
        >
          <SelectTrigger id="fontFamily">
            <SelectValue placeholder="Select a font family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter, sans-serif">Inter</SelectItem>
            <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
            <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
            <SelectItem value="Lato, sans-serif">Lato</SelectItem>
            <SelectItem value="Poppins, sans-serif">Poppins</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          value={typography.fontSize}
          onChange={(e) => handleChange('fontSize', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lineHeight">Line Height</Label>
        <Input
          id="lineHeight"
          value={typography.lineHeight}
          onChange={(e) => handleChange('lineHeight', e.target.value)}
        />
      </div>
    </div>
  )
}

