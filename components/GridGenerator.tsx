'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function GridGenerator() {
  const [gridConfig, setGridConfig] = useState({
    columns: 3,
    rows: 3,
    gap: 10,
    cellContent: 'Cell',
    backgroundColor: '#f0f0f0',
  })

  const handleChange = (key: keyof typeof gridConfig, value: string | number) => {
    setGridConfig((prev) => ({ ...prev, [key]: value }))
  }

  const generateCSS = () => {
    return `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${gridConfig.columns}, 1fr);
  grid-template-rows: repeat(${gridConfig.rows}, 1fr);
  gap: ${gridConfig.gap}px;
  background-color: ${gridConfig.backgroundColor};
  padding: 20px;
}

.grid-item {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
}
    `
  }

  return (
    <div className="space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
      <div className="lg:w-1/2 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="columns">Columns</Label>
            <Input
              id="columns"
              type="number"
              value={gridConfig.columns}
              onChange={(e) => handleChange('columns', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="rows">Rows</Label>
            <Input
              id="rows"
              type="number"
              value={gridConfig.rows}
              onChange={(e) => handleChange('rows', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="gap">Gap (px)</Label>
            <Input
              id="gap"
              type="number"
              value={gridConfig.gap}
              onChange={(e) => handleChange('gap', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="cellContent">Cell Content</Label>
            <Input
              id="cellContent"
              value={gridConfig.cellContent}
              onChange={(e) => handleChange('cellContent', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              type="color"
              value={gridConfig.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
          <pre className="bg-gray-100 p-4 rounded">
            <code>{generateCSS()}</code>
          </pre>
        </div>
      </div>
      <div className="lg:w-1/2">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
            gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
            gap: `${gridConfig.gap}px`,
            backgroundColor: gridConfig.backgroundColor,
            padding: '20px',
          }}
        >
          {Array.from({ length: gridConfig.columns * gridConfig.rows }).map((_, index) => (
            <div key={index} className="grid-item">
              {gridConfig.cellContent} {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

