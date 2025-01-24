import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "@/components/Settings";
import { RecordingTypeManager } from "@/components/RecordingTypeManager";
import { useIsConfigOpen } from "@/hooks/useIsConfigOpen";
import { RecordingList } from "@/components/RecordingList";
import { WorkspacesManager } from "@/components/WorkspacesManager";

export function Configuration() {
  const { isConfigOpen } = useIsConfigOpen();

  return (
    <AnimatePresence>
      {isConfigOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "350px", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 overflow-hidden rounded-lg border-t border-border bg-card"
        >
          <div className="h-full overflow-y-auto p-4">
            <Tabs className="w-full" defaultValue="settings">
              <TabsList className="mb-4 grid w-full grid-cols-4">
                <TabsTrigger value="settings">Configurations</TabsTrigger>
                <TabsTrigger value="recordings">Recording</TabsTrigger>
                <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
                <TabsTrigger value="types">Recording Types</TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
              <TabsContent value="recordings" className={"mb-12"}>
                <RecordingList />
              </TabsContent>
              <TabsContent value="workspaces">
                <WorkspacesManager />
              </TabsContent>
              <TabsContent value="types">
                <RecordingTypeManager />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
