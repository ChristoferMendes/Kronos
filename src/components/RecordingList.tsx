"use client";

import React from "react";
import { useState } from "react";
import { useGetRecordings } from "@/hooks/useGetRecordings";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, FolderClosed, FileVideo, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectedFile } from "@/lib/types/video.types";

export function RecordingList() {
  const { recordings } = useGetRecordings();
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  const toggleFolder = (label: string) => {
    setOpenFolders((prev) => (prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]));
  };

  const toggleFileSelection = (label: string, fileName: string) => {
    setSelectedFiles((prev) => {
      const labelIndex = prev.findIndex((item) => item.label === label);
      if (labelIndex > -1) {
        const updatedFiles = prev[labelIndex].files.includes(fileName)
          ? prev[labelIndex].files.filter((f) => f !== fileName)
          : [...prev[labelIndex].files, fileName];

        if (updatedFiles.length === 0) {
          return prev.filter((item) => item.label !== label);
        }

        return [...prev.slice(0, labelIndex), { ...prev[labelIndex], files: updatedFiles }, ...prev.slice(labelIndex + 1)];
      }
      return [...prev, { label, files: [fileName] }];
    });
  };

  const isFileSelected = (label: string, fileName: string) => {
    return selectedFiles.some((item) => item.label === label && item.files.includes(fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {recordings.map((recording) => (
        <Card key={recording.label} className="overflow-hidden">
          <CardContent className="p-0">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: openFolders.includes(recording.label) ? `${recording.color}20` : "transparent",
              }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none p-4"
                onClick={() => toggleFolder(recording.label)}
              >
                {openFolders.includes(recording.label) ? (
                  <FolderOpen className="mr-2 h-4 w-4" />
                ) : (
                  <FolderClosed className="mr-2 h-4 w-4" />
                )}
                <span className="font-medium">{recording.label}</span>
                <div className="ml-2 h-3 w-3 rounded-full" style={{ backgroundColor: recording.color }} />
              </Button>
            </motion.div>
            <AnimatePresence>
              {openFolders.includes(recording.label) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[300px] overflow-y-auto"
                >
                  {recording.files.map((file) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`flex cursor-pointer items-center justify-between p-2 hover:bg-accent ${
                        isFileSelected(recording.label, file.name) ? "bg-accent" : ""
                      }`}
                      onClick={() => toggleFileSelection(recording.label, file.name)}
                    >
                      <div className="flex min-w-0 flex-grow items-center space-x-2">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Checkbox
                            checked={isFileSelected(recording.label, file.name)}
                            className="mr-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFileSelection(recording.label, file.name);
                            }}
                          />
                        </motion.div>
                        <FileVideo className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate text-sm">{file.name}</span>
                      </div>
                      <div className="flex flex-shrink-0 items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{formatFileSize(file.fileSizeInBytes)}</span>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
