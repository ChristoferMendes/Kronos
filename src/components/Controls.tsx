import React from "react";

import { RecordingControl } from "./RecordingControl";

export function Controls() {
  return (
    <div className="h-full w-56 rounded-md bg-secondary p-2">
      <h3 className="">Controls</h3>

      <div className="mt-1">
        <RecordingControl />
      </div>
    </div>
  );
}
