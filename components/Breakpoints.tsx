'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface BreakpointsProps {
  breakpoints: { [key: string]: number }
  onChange: (breakpoints: { [key: string]: number }) => void
}

export function Breakpoints({ breakpoints, onChange }: BreakpointsProps) {
  const [newBreakpointName, setNewBreakpointName] = useState('')
  const [newBreakpointValue, setNewBreakpointValue] = useState('')

  const handleChange = (key: string, value: string) => {
    onChange({ ...breakpoints, [key]: parseInt(value) || 0 })
  }

  const handleAddBreakpoint = () => {
    if (newBreakpointName && newBreakpointValue) {
      onChange({
        ...breakpoints,
        [newBreakpointName]: parseInt(newBreakpointValue) || 0,
      })
      setNewBreakpointName('')
      setNewBreakpointValue('')
    }
  }

  const handleRemoveBreakpoint = (key: string) => {
    const updatedBreakpoints = { ...breakpoints }
    delete updatedBreakpoints[key]
    onChange(updatedBreakpoints)
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveBreakpoint(key)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Name"
          value={newBreakpointName}
          onChange={(e) => setNewBreakpointName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Value"
          value={newBreakpointValue}
          onChange={(e) => setNewBreakpointValue(e.target.value)}
        />
        <Button onClick={handleAddBreakpoint}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  )
}

