import { dirname, resolve } from 'path'
import type { Browser } from 'playwright'
import rimraf from 'rimraf'
import { promisify } from 'util'
import { createFiles, Dir } from './create-files'
import { exec } from './exec'

interface SetupOptions {
  files: Dir
}

export function setup(
  {
    files
  }: SetupOptions
) {
  const processKiller = new Set<Function>()
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

      for (const kill of processKiller) {
        kill()
      }
    })

    return payload
  }

  const run = (command: 'build' | 'start' | 'test' | 'install' | 'serve') => exec(
    `yarn ${command}`,
    { cwd: rootDir, processKiller }
  )

  const browser = () => (global as any)._browser as Browser

  const startProject = async (
    {
      waitMatcher
    }: {
      waitMatcher?: string | RegExp
    } = {}
  ) => {
    await run('install').emit()
    await run('build').emit();
    const serveProcess = run('serve');

    serveProcess.emit()

    if (waitMatcher) {
      await serveProcess.waitForOutput(waitMatcher)
    }
  }

  const payload = {
    files,
    rootDir,
    beforeAndAfter,
    run,
    browser,
    startProject,
    processKiller
  }

  return payload
}
