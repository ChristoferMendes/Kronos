"use client";

import React from "react";
import { useState } from "react";
import { useGetRecordings } from "@/hooks/useGetRecordings";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, FolderClosed, FileVideo, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelectedFiles } from "@/hooks/useSelectedFiles";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export function RecordingList() {
  const { recordings, getRecordings } = useGetRecordings();
  const { openFolders, toggleFileSelection, toggleFolder, selectedFiles, deleteSelectedFiles } = useSelectedFiles(getRecordings);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const getTotalSelectedFiles = () => {
    return selectedFiles.reduce((total, item) => total + item.files.length, 0);
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
                        <Button variant="destructive" size="icon" onClick={handleDeleteClick}>
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle>Delete Selected Files</DialogTitle>
          <DialogDescription>You are about to delete {getTotalSelectedFiles()} files. Are you sure?</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                No
              </Button>
            </DialogClose>
            <Button
              onClick={async () => {
                setIsDeleteDialogOpen(false);
                await deleteSelectedFiles();
              }}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
