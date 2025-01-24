import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";
import { useIsConfigOpen } from "@/hooks/useIsConfigOpen";

export function ConfigButton() {
  const { setIsConfigOpen, isConfigOpen } = useIsConfigOpen();

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={() => setIsConfigOpen(!isConfigOpen)}>
            <Cog className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Configurations</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
