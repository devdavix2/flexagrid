'use client'

import { DesignConfig, Element } from './FlexiGrid'

interface LivePreviewProps {
  designConfig: DesignConfig
}

export function LivePreview({ designConfig }: LivePreviewProps) {
  const { gridColumns, breakpoints, elements, colorScheme, typography } = designConfig

  const renderElement = (element: Element) => {
    return (
      <div
        key={element.id}
        style={{
          ...element.styles,
          fontFamily: typography.fontFamily,
          fontSize: typography.fontSize,
          lineHeight: typography.lineHeight,
          color: colorScheme.text,
        }}
      >
        {element.type} - {element.id}
        {element.children.map(renderElement)}
      </div>
    )
  }

  return (
    <div className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: '10px',
          color: colorScheme.text,
          backgroundColor: colorScheme.background,
        }}
      >
        {elements.map(renderElement)}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Responsive Breakpoints:</h3>
        <ul>
          {Object.entries(breakpoints).map(([key, value]) => (
            <li key={key}>
              {key}: {value}px
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

