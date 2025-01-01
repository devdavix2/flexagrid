'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FlexboxGenerator() {
  const [flexContainer, setFlexContainer] = useState({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    backgroundColor: '#f0f0f0',
  })

  const [flexItem, setFlexItem] = useState({
    flexGrow: '0',
    flexShrink: '1',
    flexBasis: 'auto',
  })

  const [itemCount, setItemCount] = useState(3)

  const handleContainerChange = (property: string, value: string) => {
    setFlexContainer((prev) => ({ ...prev, [property]: value }))
  }

  const handleItemChange = (property: string, value: string) => {
    setFlexItem((prev) => ({ ...prev, [property]: value }))
  }

  const generateCSS = () => {
    return `
.flex-container {
  display: ${flexContainer.display};
  flex-direction: ${flexContainer.flexDirection};
  justify-content: ${flexContainer.justifyContent};
  align-items: ${flexContainer.alignItems};
  flex-wrap: ${flexContainer.flexWrap};
  background-color: ${flexContainer.backgroundColor};
  padding: 20px;
}

.flex-item {
  flex-grow: ${flexItem.flexGrow};
  flex-shrink: ${flexItem.flexShrink};
  flex-basis: ${flexItem.flexBasis};
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
        <div>
          <h3 className="text-lg font-medium mb-2">Flex Container</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="flexDirection">Flex Direction</Label>
              <Select
                value={flexContainer.flexDirection}
                onValueChange={(value) => handleContainerChange('flexDirection', value)}
              >
                <SelectTrigger id="flexDirection">
                  <SelectValue placeholder="Select flex direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">row</SelectItem>
                  <SelectItem value="row-reverse">row-reverse</SelectItem>
                  <SelectItem value="column">column</SelectItem>
                  <SelectItem value="column-reverse">column-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="justifyContent">Justify Content</Label>
              <Select
                value={flexContainer.justifyContent}
                onValueChange={(value) => handleContainerChange('justifyContent', value)}
              >
                <SelectTrigger id="justifyContent">
                  <SelectValue placeholder="Select justify content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="space-between">space-between</SelectItem>
                  <SelectItem value="space-around">space-around</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alignItems">Align Items</Label>
              <Select
                value={flexContainer.alignItems}
                onValueChange={(value) => handleContainerChange('alignItems', value)}
              >
                <SelectTrigger id="alignItems">
                  <SelectValue placeholder="Select align items" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="stretch">stretch</SelectItem>
                  <SelectItem value="baseline">baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="flexWrap">Flex Wrap</Label>
              <Select
                value={flexContainer.flexWrap}
                onValueChange={(value) => handleContainerChange('flexWrap', value)}
              >
                <SelectTrigger id="flexWrap">
                  <SelectValue placeholder="Select flex wrap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowrap">nowrap</SelectItem>
                  <SelectItem value="wrap">wrap</SelectItem>
                  <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={flexContainer.backgroundColor}
                onChange={(e) => handleContainerChange('backgroundColor', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Flex Item</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="flexGrow">Flex Grow</Label>
              <Input
                id="flexGrow"
                type="number"
                value={flexItem.flexGrow}
                onChange={(e) => handleItemChange('flexGrow', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="flexShrink">Flex Shrink</Label>
              <Input
                id="flexShrink"
                type="number"
                value={flexItem.flexShrink}
                onChange={(e) => handleItemChange('flexShrink', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="flexBasis">Flex Basis</Label>
              <Input
                id="flexBasis"
                value={flexItem.flexBasis}
                onChange={(e) => handleItemChange('flexBasis', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="itemCount">Number of Items</Label>
          <Input
            id="itemCount"
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(parseInt(e.target.value))}
          />
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
          className="flex-container"
          style={{
            display: flexContainer.display,
            flexDirection: flexContainer.flexDirection as any,
            justifyContent: flexContainer.justifyContent,
            alignItems: flexContainer.alignItems,
            flexWrap: flexContainer.flexWrap as any,
            backgroundColor: flexContainer.backgroundColor,
            padding: '20px',
            minHeight: '300px',
          }}
        >
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className="flex-item"
              style={{
                flexGrow: parseFloat(flexItem.flexGrow),
                flexShrink: parseFloat(flexItem.flexShrink),
                flexBasis: flexItem.flexBasis,
              }}
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

