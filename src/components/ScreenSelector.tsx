import React from "react"
import { AppWindowMacIcon, MonitorUp, TvMinimalPlayIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScreenOption {
  id: string
  icon: React.ElementType
  label: string
}

interface ScreenSelectorProps {
  selectedScreen: string
  onScreenSelect: (screenId: string) => void
}

export function ScreenSelector({ selectedScreen, onScreenSelect }: Readonly<ScreenSelectorProps>) {
  const screenOptions: ScreenOption[] = [
    { id: "primary", icon: TvMinimalPlayIcon, label: "Primary" },
    { id: "secondary", icon: TvMinimalPlayIcon, label: "Secondary" },
    { id: "window", icon: AppWindowMacIcon, label: "Window" },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <MonitorUp className="h-4 w-4" />
        <span className="text-sm font-medium">Screen Selection</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {screenOptions.map((option) => (
          <Button
            key={option.id}
            variant={selectedScreen === option.id ? "secondary" : "outline"}
            className="w-full"
            onClick={() => onScreenSelect(option.id)}
          >
            <option.icon className="mr-2 h-4 w-4" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
} 