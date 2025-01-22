import React from "react";

import { useGlobalVideoSources } from "@/store/useGlobalVideoSources";
import { useLocalStorageVideoSources } from "@/hooks/useLocalStorageVideoSources";
import { MonitorIcon, PlusIcon } from "lucide-react";
import { AddSourceDialog } from "./AddSourceDialog";

export function Sources() {
  const { videoSources: globalVideoSources } = useGlobalVideoSources();
  const { videoSources } = useLocalStorageVideoSources();

  return (
    <div className="flex h-full w-56 flex-col rounded-md bg-secondary p-2">
      <h3 className="">Sources</h3>

      <div className="mt-2 h-[60%]">
        <div className="flex items-center gap-2">
          <MonitorIcon />
          <p>{globalVideoSources[0]?.name}</p>
        </div>
      </div>

      <div>
        <AddSourceDialog />
      </div>
    </div>
  );
}
