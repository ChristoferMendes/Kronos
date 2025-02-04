import React from "react"
import { motion } from "framer-motion"

interface DecibelMeterProps {
  volume: number
  isMuted: boolean
}

export function DecibelMeter({ volume, isMuted }: DecibelMeterProps) {
  const levels = [
    { threshold: 0, color: "bg-green-500", width: "12.5%" },
    { threshold: 20, color: "bg-green-500", width: "12.5%" },
    { threshold: 40, color: "bg-green-500", width: "12.5%" },
    { threshold: 60, color: "bg-yellow-500", width: "12.5%" },
    { threshold: 70, color: "bg-yellow-500", width: "12.5%" },
    { threshold: 80, color: "bg-yellow-500", width: "12.5%" },
    { threshold: 90, color: "bg-red-500", width: "12.5%" },
    { threshold: 95, color: "bg-red-600", width: "12.5%" },
  ]

  const getOpacity = (isMuted: boolean, volume: number, threshold: number) => {
    if (isMuted) return 0.15;
    return volume >= threshold ? 1 : 0.40;
  };

  return (
    <div className="relative h-1 w-full rounded bg-gray-900">
      <div className="absolute left-0 top-0 flex h-full w-full">
        {levels.map((level) => (
          <motion.div
            key={level.threshold}
            className={`h-full ${level.color}`}
            style={{ width: level.width }}
            initial={{ opacity: 0.15 }}
            animate={{
              opacity: getOpacity(isMuted, volume, level.threshold),
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="absolute left-0 top-0 h-full bg-white/20"
        initial={{ width: "0%" }}
        animate={{ 
          width: isMuted ? "0%" : `${volume}%`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  )
} 