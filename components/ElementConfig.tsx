'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ElementConfigProps {
  elements: {
    header: { height: string }
    footer: { height: string }
    sidebar: { width: string }
    content: { padding: string }
  }
  onChange: (elements: ElementConfigProps['elements']) => void
}

export function ElementConfig({ elements, onChange }: ElementConfigProps) {
  const handleChange = (
    element: keyof ElementConfigProps['elements'],
    property: string,
    value: string
  ) => {
    onChange({
      ...elements,
      [element]: { ...elements[element], [property]: value },
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Element Configuration</h2>
      {Object.entries(elements).map(([element, properties]) => (
        <div key={element} className="space-y-2">
          <h3 className="text-lg font-medium capitalize">{element}</h3>
          {Object.entries(properties).map(([property, value]) => (
            <div key={property} className="flex items-center space-x-2">
              <Label htmlFor={`${element}-${property}`} className="w-20 capitalize">
                {property}:
              </Label>
              <Input
                id={`${element}-${property}`}
                value={value}
                onChange={(e) =>
                  handleChange(
                    element as keyof ElementConfigProps['elements'],
                    property,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

