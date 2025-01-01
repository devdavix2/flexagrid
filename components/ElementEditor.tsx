'use client'

import { useState } from 'react'
import { Element } from './FlexiGrid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface ElementEditorProps {
  elements: Element[]
  onChange: (elements: Element[]) => void
}

export function ElementEditor({ elements, onChange }: ElementEditorProps) {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)

  const handleElementChange = (updatedElement: Element) => {
    const updateElements = (els: Element[]): Element[] => {
      return els.map((el) => {
        if (el.id === updatedElement.id) {
          return updatedElement
        }
        if (el.children.length > 0) {
          return { ...el, children: updateElements(el.children) }
        }
        return el
      })
    }

    onChange(updateElements(elements))
  }

  const addNewElement = (parentId: string | null) => {
    const newElement: Element = {
      id: `element-${Date.now()}`,
      type: 'div',
      styles: {
        width: '100%',
        height: 'auto',
        padding: '10px',
        margin: '0',
        backgroundColor: 'transparent',
      },
      children: [],
    }

    const addElementToTree = (els: Element[]): Element[] => {
      return els.map((el) => {
        if (el.id === parentId) {
          return { ...el, children: [...el.children, newElement] }
        }
        if (el.children.length > 0) {
          return { ...el, children: addElementToTree(el.children) }
        }
        return el
      })
    }

    onChange(parentId ? addElementToTree(elements) : [...elements, newElement])
    setSelectedElementId(newElement.id)
  }

  const renderElementTree = (els: Element[], depth = 0) => {
    return (
      <ul className={`pl-${depth * 4}`}>
        {els.map((el) => (
          <li key={el.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value={el.id}>
                <AccordionTrigger>{el.type} - {el.id}</AccordionTrigger>
                <AccordionContent>
                  <Button onClick={() => setSelectedElementId(el.id)}>Edit</Button>
                  <Button onClick={() => addNewElement(el.id)}>Add Child</Button>
                  {renderElementTree(el.children, depth + 1)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ))}
      </ul>
    )
  }

  const renderElementEditor = () => {
    const findElement = (els: Element[]): Element | null => {
      for (const el of els) {
        if (el.id === selectedElementId) {
          return el
        }
        const found = findElement(el.children)
        if (found) {
          return found
        }
      }
      return null
    }

    const selectedElement = findElement(elements)

    if (!selectedElement) {
      return null
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Edit Element: {selectedElement.id}</h3>
        <div className="space-y-2">
          <Label htmlFor="elementType">Element Type</Label>
          <Select
            value={selectedElement.type}
            onValueChange={(value) =>
              handleElementChange({ ...selectedElement, type: value as Element['type'] })
            }
          >
            <SelectTrigger id="elementType">
              <SelectValue placeholder="Select element type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="div">div</SelectItem>
              <SelectItem value="header">header</SelectItem>
              <SelectItem value="footer">footer</SelectItem>
              <SelectItem value="nav">nav</SelectItem>
              <SelectItem value="main">main</SelectItem>
              <SelectItem value="section">section</SelectItem>
              <SelectItem value="article">article</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {Object.entries(selectedElement.styles).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key}</Label>
            <Input
              id={key}
              value={value}
              onChange={(e) =>
                handleElementChange({
                  ...selectedElement,
                  styles: { ...selectedElement.styles, [key]: e.target.value },
                })
              }
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Element Editor</h2>
      <Button onClick={() => addNewElement(null)}>Add Root Element</Button>
      <div className="flex space-x-4">
        <div className="w-1/2">{renderElementTree(elements)}</div>
        <div className="w-1/2">{renderElementEditor()}</div>
      </div>
    </div>
  )
}

