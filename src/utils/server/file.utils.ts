import { existsSync, mkdirSync, readdirSync, statSync, rmSync } from "fs";
import { extname, join } from "path";

export function createFolderIfNotExists(filePath: string) {
  const exists = existsSync(filePath);

  if (exists) {
    return;
  }

  mkdirSync(filePath, { recursive: true });
}

export function getFileInfoFromFolder(route: string) {
  const files = readdirSync(route, "utf8");
  const response = [];
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
