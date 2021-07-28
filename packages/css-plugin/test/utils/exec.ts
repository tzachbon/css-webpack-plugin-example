import { spawn } from 'child_process';

export function exec(command: string, options?: Parameters<typeof spawn>[2]) {
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