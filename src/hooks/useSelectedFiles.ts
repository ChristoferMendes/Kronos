import { useState } from "react";
import { SelectedFile } from "@/lib/types/video.types";
import { toast } from "sonner";

export function useSelectedFiles(getRecordings: () => void) {
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

        return [
          ...prev.slice(0, labelIndex),
          {
            ...prev[labelIndex],
            files: updatedFiles,
          },
          ...prev.slice(labelIndex + 1),
        ];
      }
      return [...prev, { label, files: [fileName] }];
    });
  };

  async function deleteSelectedFiles() {
    const { video } = window;
    await video.deleteVideos(selectedFiles);

    setSelectedFiles([]);
    getRecordings();
    toast.success("Successfully deleted selected files.", {
      position: "top-center",
    });
  }

  return {
    openFolders,
    selectedFiles,
    toggleFileSelection,
    toggleFolder,
    deleteSelectedFiles,
  };
}
