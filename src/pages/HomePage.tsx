import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cog } from "lucide-react"
import { WorkspaceSelector } from "@/components/WorkspaceSelector"
import { RecordingTypeSelector } from "@/components/RecordingTypeSelector"
import { VideoPreview } from "@/components/VideoPreview"
import { RecordingControls } from "@/components/RecordingControls"
import { ConfigPanel } from "@/components/ConfigPanel"
import { useIsConfigOpen } from '@/hooks/useIsConfigOpen'
import { RecordingTimer } from "@/components/RecordingTimer"

export default function HomePage() {
  const { isConfigOpen, setIsConfigOpen } = useIsConfigOpen();

  return (
    <div className="flex flex-col h-screen bg-background p-4">
      <Card className="flex-grow overflow-hidden">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex-grow flex flex-col border mb-4">
            <VideoPreview />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <WorkspaceSelector />
              <RecordingTypeSelector />
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2">
                <RecordingControls />
                <Button variant="ghost" size="icon" onClick={() => setIsConfigOpen(!isConfigOpen)}>
                  <Cog className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-2">
            <RecordingTimer  />
          </div>

          <AnimatePresence initial={false}>
            {isConfigOpen && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { 
                    opacity: 1,
                    scaleY: 1,
                    height: "300px"
                  },
                  collapsed: { 
                    opacity: 0,
                    scaleY: 0,
                    height: 0
                  },
                }}
                transition={{ 
                  duration: 0.29,
                  ease: "easeInOut"
                }}
                className="mt-4 bg-card border rounded-lg origin-top overflow-hidden"
              >
                <div className="h-[300px] overflow-auto">
                  <ConfigPanel />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}