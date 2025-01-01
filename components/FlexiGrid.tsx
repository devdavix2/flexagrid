'use client'

import { useState } from 'react'
import { GridGenerator } from './GridGenerator'
import { FlexboxGenerator } from './FlexboxGenerator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FlexiGrid() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">FlexiGrid - Grid and Flexbox Generator</h1>
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="flexbox">Flexbox</TabsTrigger>
        </TabsList>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TabsContent value="grid" className="mt-0">
            <GridGenerator />
          </TabsContent>
          <TabsContent value="flexbox" className="mt-0">
            <FlexboxGenerator />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

