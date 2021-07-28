import { mkdir, writeFile } from 'fs/promises'
import execa from 'execa'
import { dirname, resolve } from 'path'
import { promisify } from 'util'
import rimraf from 'rimraf'

export type Dir = {
  [name: string]: string | Dir
}

interface SetupOptions {
  files: Dir
}

export function setup(
  {
    files
  }: SetupOptions
) {
  const rootDir = resolve(
    dirname(dirname(dirname(require.resolve('@webpack-css/plugin')))),
    `temp-${Math.random().toString(36).slice(2)}`
  )

  const beforeAndAfter = () => {
    beforeEach(async () => {
      await createFiles(rootDir, files)
    })

    afterEach(async () => {
      await promisify(rimraf)(rootDir)
    })

    return payload
  }

  const run = async (command: 'build' | 'start' | 'test' | 'install' = 'install') => execa(
    'yarn',
    [command],
    { cwd: rootDir }
  )


  const payload = {
    files,
    rootDir,
    beforeAndAfter,
    run
  }

  return payload
}

async function createFiles(rootDir: string, files: Dir) {
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
