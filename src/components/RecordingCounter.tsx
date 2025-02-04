import React from 'react'
import { useRecordingTime } from "@/hooks/useRecordingTime";
import { useGlobalIsRecording } from "@/store/useGlobalIsRecording";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { formatTime } from '@/helpers/time_helpers';

export function RecordingCounter() {
  const { isRecording } = useGlobalIsRecording();
  const { counter } = useRecordingTime(isRecording);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
    >
      <Clock className="h-4 w-4" />
      <motion.span
        key={counter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {formatTime(counter)}
      </motion.span>
    </motion.div>
  )
}