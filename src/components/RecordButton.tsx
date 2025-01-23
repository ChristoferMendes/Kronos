import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecording } from "@/hooks/useRecording";
import { Button } from "@/components/ui/button";
import { CircleStopIcon as Stop, PlayIcon } from "lucide-react";

export function RecordButton() {
  const { isRecording, stopRecording, startRecording } = useRecording();

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isRecording ? (
          <motion.div
            key="record"
            initial={{ scale: 0.95, filter: "blur(8px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.95, filter: "blur(8px)" }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <Button variant="default" onClick={startRecording}>
              <PlayIcon className="mr-2 h-4 w-4" /> Start Recording
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="stop"
            initial={{ scale: 0.95, filter: "blur(8px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.95, filter: "blur(8px)" }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <Button variant="destructive" onClick={stopRecording}>
              <Stop className="mr-2 h-4 w-4 animate-pulse" /> Stop Recording
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
