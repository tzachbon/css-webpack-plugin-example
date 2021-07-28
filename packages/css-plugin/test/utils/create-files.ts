import { mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'

export async function createFiles(rootDir: string, files: Dir) {
  await mkdir(rootDir, { recursive: true })

  for (const [fileName, fileValue] of Object.entries(files)) {
    const currentPath = resolve(rootDir, fileName)
    if (typeof fileValue === 'string') {
      await writeFile(currentPath, fileValue)
    } else if (Boolean(fileValue) && typeof fileValue === 'object') {
      await createFiles(currentPath, fileValue)
    }
  }
}

export type Dir = {
  [name: string]: string | Dir
}