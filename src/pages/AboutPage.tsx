"use client"

import { useGetVideoSources } from "@/hooks/useGetVideoSources"
import { useVideoRef } from "@/hooks/useVideoRef"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import ToggleTheme from "@/components/ToggleTheme"
import { RecordingTypesList } from "@/components/RecordingTypesList"
import { RecordButton } from "@/components/RecordButton"
import { ConfigButton } from "@/components/ConfigButton"
import { Configuration } from "@/components/Configuration"
import { useGlobalIsConfigOpen } from "@/store/useGlobalIsConfigOpen"

export default function AboutPage() {
  const { videoSources, isGetVideoSourcesLoading } = useGetVideoSources()
  const { videoRef } = useVideoRef(videoSources[0]?.id)
  const { isConfigOpen } = useGlobalIsConfigOpen()

  return (
    <div className="flex flex-col h-screen bg-background">
      <Card className="flex-grow overflow-hidden m-4 relative">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex justify-end mb-2">
            <ToggleTheme />
          </div>

          <motion.div
            className="flex-grow flex flex-col-reverse"
            animate={{
              marginBottom: isConfigOpen ? "300px" : "0px",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <RecordingTypesList />
                <div className="flex items-center space-x-2">
                  <RecordButton />
                  <ConfigButton />
                </div>
              </div>
            </div>

            <motion.div
              className="flex-grow relative rounded-lg overflow-hidden mb-4"
              animate={{
                height: isConfigOpen ? "calc(100% - 40px)" : "100%",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder */}
              <video ref={videoRef} className="absolute inset-0 w-full h-full" autoPlay muted />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isConfigOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "300px" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-card border-t border-border overflow-hidden"
              >
                <Configuration />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

