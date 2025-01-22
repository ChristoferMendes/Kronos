import React from "react"
import { useGlobalIsConfigOpen } from "@/store/useGlobalIsConfigOpen"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Configuration() {
  const { isConfigOpen } = useGlobalIsConfigOpen()

  return (
    <AnimatePresence>
      {isConfigOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "300px", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border-t border-border overflow-hidden mt-4 rounded-lg"
        >
          <div className="h-full overflow-auto p-4">
            <Tabs className="w-full" defaultValue="settings">
              <TabsList className="mb-4">
                <TabsTrigger value="settings">Configurações</TabsTrigger>
                <TabsTrigger value="recordings">Gravações</TabsTrigger>
                <TabsTrigger value="types">Tipos de Gravação</TabsTrigger>
              </TabsList>
              <TabsContent value="settings">
                <p>Configurações de gravação aqui</p>
              </TabsContent>
              <TabsContent value="recordings">
                <p>Lista de gravações aqui</p>
              </TabsContent>
              <TabsContent value="types">
                <p>Gerenciamento de tipos de gravação aqui</p>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

