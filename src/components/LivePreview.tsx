import { DesignConfig } from '../App'

interface LivePreviewProps {
  designConfig: DesignConfig
}

export function LivePreview({ designConfig }: LivePreviewProps) {
  const { gridColumns, breakpoints, elements } = designConfig

  const generateGridColumns = () => {
    return `repeat(${gridColumns}, 1fr)`
  }

  return (
    <div className="border rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: generateGridColumns(),
          gridTemplateRows: `${elements.header.height} 1fr ${elements.footer.height}`,
          height: '600px',
          gap: '10px',
        }}
      >
        <div
          style={{ gridColumn: '1 / -1', backgroundColor: '#e0e0e0' }}
          className="flex items-center justify-center"
        >
          Header
        </div>
        <div
          style={{
            gridColumn: '1 / 3',
            backgroundColor: '#f0f0f0',
            padding: elements.content.padding,
          }}
          className="flex items-center justify-center"
        >
          Sidebar
        </div>
        <div
          style={{
            gridColumn: '3 / -1',
            backgroundColor: '#f5f5f5',
            padding: elements.content.padding,
          }}
          className="flex items-center justify-center"
        >
          Content
        </div>
        <div
          style={{ gridColumn: '1 / -1', backgroundColor: '#e0e0e0' }}
          className="flex items-center justify-center"
        >
          Footer
        </div>
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

