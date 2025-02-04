import { errorAsValueSync } from "../../helpers/try-catch_helpers";
import { VideoInfo } from "@/lib/types/video.types";
import { existsSync, mkdirSync, readdirSync, statSync, rmSync } from "fs";
import { extname, join } from "path";

export function createFolderIfNotExists(filePath: string) {
  const exists = existsSync(filePath);

  if (exists) {
    return;
  }

  mkdirSync(filePath, { recursive: true });
}

export function getFileInfoFromFolder(route: string): VideoInfo[] {
  const [error, files] = errorAsValueSync(() => readdirSync(route));
  const response: VideoInfo[] = [];

  if (error) {
    return response;
  }

  for (const file of files) {
    const extension = extname(file);
    const fileName = join(route, file);
    const fileSizeInBytes = statSync(fileName).size;
    response.push({ name: file, extension, fileSizeInBytes });
  }

  return response;
}

export function deleteFile(filePath: string) {
  rmSync(filePath);
}

export function deleteFolder(folderPath: string) {
  rmSync(folderPath, { recursive: true, force: true });
}
