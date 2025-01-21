import { desktopCapturer, dialog, ipcMain } from "electron";
import { VIDEO_GET_SOURCES, VIDEO_SAVE_FILE, VIDEO_SHOW_SAVE_DIALOG } from "./video.channels";
import { writeFile } from "fs";

export function addVideoEventListeners() {
  ipcMain.handle(VIDEO_GET_SOURCES, () => desktopCapturer.getSources({ types: ["window", "screen"] }));
  ipcMain.handle(VIDEO_SHOW_SAVE_DIALOG, async () => {
    return await dialog.showSaveDialog({
      buttonLabel: "Save video",
      defaultPath: `vid-${Date.now()}.webm`,
    });
  });
  ipcMain.handle(VIDEO_SAVE_FILE, async (_, filePath: string, arrayBuffer: ArrayBuffer) => {
    console.log(arrayBuffer, "2");
    const buffer = Buffer.from(arrayBuffer);

    writeFile(filePath, buffer, () => console.log("video saved successfully!"));
  });
}
