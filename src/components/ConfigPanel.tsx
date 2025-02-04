import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsContent } from "./SettingsContent"

export function ConfigPanel() {
  return (
    <div className="h-full p-4 overflow-auto">
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
          <TabsTrigger value="types">Recording Types</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <SettingsContent />
        </TabsContent>
        <TabsContent value="recordings">
          <p>List of recordings goes here</p>
        </TabsContent>
        <TabsContent value="types">
          <p>Recording type management goes here</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

