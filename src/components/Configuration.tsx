import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings } from "@/components/Settings";
import { RecordingTypeManager } from "@/components/RecordingTypeManager";
import { useIsConfigOpen } from "@/hooks/useIsConfigOpen";

export function Configuration() {
  const { isConfigOpen } = useIsConfigOpen()

  return (
    <AnimatePresence>
      {isConfigOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "350px", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border-t border-border overflow-hidden mt-4 rounded-lg"
        >
          <div className="h-full p-4 overflow-hidden">
            <Tabs className="w-full" defaultValue="settings">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="settings">Configurations</TabsTrigger>
                <TabsTrigger value="recordings">Recording</TabsTrigger>
                <TabsTrigger value="types">Recording Types</TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
              <TabsContent value="recordings">
                <p>Configuration List...</p>
              </TabsContent>
              <TabsContent value="types">
                <RecordingTypeManager />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

