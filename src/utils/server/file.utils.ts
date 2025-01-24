import { existsSync, mkdirSync } from "fs";

export function createFolderIfNotExists(filePath: string) {
  const exists = existsSync(filePath);
  console.log({ exists });

  if (exists) {
    return;
  }

  mkdirSync(filePath, { recursive: true });
}
