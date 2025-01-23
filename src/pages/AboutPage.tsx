"use client";

import { useGetVideoSources } from "@/hooks/useGetVideoSources";
import { useVideoRef } from "@/hooks/useVideoRef";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ToggleTheme from "@/components/ToggleTheme";
import { RecordingTypesList } from "@/components/RecordingTypesList";
import { RecordButton } from "@/components/RecordButton";
import { ConfigButton } from "@/components/ConfigButton";
import { Configuration } from "@/components/Configuration";
import { useGlobalIsConfigOpen } from "@/store/useGlobalIsConfigOpen";
import { useGlobalVideoSettings } from "@/store/useGlobalVideoSettings";

export default function AboutPage() {
  const { videoSources } = useGetVideoSources();
  const { screen } = useGlobalVideoSettings();
  const { videoRef } = useVideoRef(screen?.id || videoSources[0]?.id);
  const { isConfigOpen } = useGlobalIsConfigOpen();

  return (
    <div className="flex h-screen flex-col bg-background">
      <Card className="relative m-4 flex-grow overflow-hidden">
        <CardContent className="flex h-full flex-col p-4">
          <div className="mb-2 flex justify-end">
            <ToggleTheme />
          </div>

          <motion.div
            className="flex flex-grow flex-col-reverse"
            animate={{
              marginBottom: isConfigOpen ? "350px" : "0px",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <RecordingTypesList />
                <div className="flex items-center space-x-2">
                  <RecordButton />
                  <ConfigButton />
                </div>
              </div>
            </div>

            <motion.div
              className="relative mb-4 flex-grow overflow-hidden rounded-lg"
              animate={{
                height: isConfigOpen ? "calc(100% - 40px)" : "100%",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 border" />
              <video ref={videoRef} className="absolute inset-0 h-full w-full" autoPlay muted />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isConfigOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "350px" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-border bg-card"
              >
                <Configuration />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
