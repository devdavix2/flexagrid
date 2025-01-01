import { useState } from 'react'
import { GridSystem } from './components/GridSystem'
import { Breakpoints } from './components/Breakpoints'
import { ElementConfig } from './components/ElementConfig'
import { LivePreview } from './components/LivePreview'
import { CSSGenerator } from './components/CSSGenerator'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface DesignConfig {
  gridColumns: number
  breakpoints: { [key: string]: number }
  elements: {
    header: { height: string }
    footer: { height: string }
    sidebar: { width: string }
    content: { padding: string }
  }
}

export default function App() {
  const [designConfig, setDesignConfig] = useState<DesignConfig>({
    gridColumns: 12,
    breakpoints: {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
    },
    elements: {
      header: { height: '80px' },
      footer: { height: '60px' },
      sidebar: { width: '250px' },
      content: { padding: '20px' },
    },
  })

  const handleExport = () => {
    const css = CSSGenerator(designConfig)
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flexigrid-styles.css'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">FlexiGrid</h1>
      <Tabs defaultValue="config">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GridSystem
              columns={designConfig.gridColumns}
              onChange={(columns) =>
                setDesignConfig((prev) => ({ ...prev, gridColumns: columns }))
              }
            />
            <Breakpoints
              breakpoints={designConfig.breakpoints}
              onChange={(breakpoints) =>
                setDesignConfig((prev) => ({ ...prev, breakpoints }))
              }
            />
            <ElementConfig
              elements={designConfig.elements}
              onChange={(elements) =>
                setDesignConfig((prev) => ({ ...prev, elements }))
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <LivePreview designConfig={designConfig} />
        </TabsContent>
      </Tabs>
      <div className="mt-4">
        <Button onClick={handleExport}>Export CSS</Button>
      </div>
    </div>
  )
}

