import React from "react"
import { motion } from "framer-motion"
import { useVideoRef } from "@/hooks/useVideoRef"
import { useGetVideoSources } from "@/hooks/useGetVideoSources";
import { useGlobalVideoSettings } from "@/store/useGlobalVideoSettings";
import { useGlobalIsRecording } from "@/store/useGlobalIsRecording";

export function VideoPreview() {
  const { videoSources } = useGetVideoSources();
  const { screen } = useGlobalVideoSettings();
  const { videoRef } = useVideoRef(screen?.id || videoSources[1]?.id);
  const { isRecording } = useGlobalIsRecording();

  return (
    <motion.div
      className="flex-grow relative rounded-lg overflow-hidden mb-4"
      animate={{
        border: isRecording ? "2px solid #ef4444" : "2px solid transparent",
      }}
      transition={{ duration: 0.3 }}
    >
      <video ref={videoRef} className="absolute inset-0 h-full w-full" autoPlay muted />
      {isRecording && (
        <motion.div 
          className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Recording
        </motion.div>
      )}
    </motion.div>
  )
}

