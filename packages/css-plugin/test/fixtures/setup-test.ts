import type { Browser } from 'playwright'
import { mkdir, writeFile } from 'fs/promises'
import { spawn } from 'child_process'
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
  const processKillers = new Set<Function>()
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

      for (const killProcess of processKillers) {
        killProcess()
      }
    })

    return payload
  }

  const run = (command: 'build' | 'start' | 'test' | 'install' | 'serve') => exec(
    `yarn ${command}`,
    { cwd: rootDir }
  )

  const browser = () => (global as any)._browser as Browser

  const startProject = async (waitMatcher: string | RegExp = /Accepting connections/) => {
    await run('install').emit()
    await run('build').emit();
    const serveProcess = run('serve');
    const { killProcess, waitForOutput } = serveProcess;

    processKillers.add(killProcess)
    serveProcess.emit()

    await waitForOutput(waitMatcher)
  }

  const payload = {
    files,
    rootDir,
    beforeAndAfter,
    run,
    browser,
    startProject,
    processKillers
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


function exec(command: string, options?: Parameters<typeof spawn>[2]) {
  let totalData = ''
  let resolve: Function

  const emit = () => new Promise((res, rej) => {
    resolve = () => {
      res(undefined);
      process.kill()
    };

    const process = spawn(
      command.split(' ').shift()!,
      command.split(' ').slice(1),
      options || {}
    )

    process.stdout!.on('data', (data: Buffer) => {
      totalData += `\n${data.toString()}`
    })

    process.stdout!.on('close', () => res(totalData))

    process.stderr!.on('data', rej)
  })

  const waitForOutput = (stringOrRegex: string | RegExp) => new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      rej(new Error(`waitForOutput: Timeout waiting for ${stringOrRegex}`))
      clearInterval(interval)
      clearTimeout(timeout)
    }, 10000);

    const interval = setInterval(() => {
      if (typeof stringOrRegex === 'string' ? totalData.includes(stringOrRegex) : stringOrRegex.test(totalData)) {
        res(undefined)
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }, 50)
  })

  const killProcess = () => {
    resolve()

    return totalData
  }

  return {
    emit,
    killProcess,
    waitForOutput
  }
}