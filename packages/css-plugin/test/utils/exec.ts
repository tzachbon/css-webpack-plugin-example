import { spawn, SpawnOptions } from 'child_process';

interface ExecOptions extends SpawnOptions {
  processKiller?: Set<Function>
}

export function exec(command: string, options?: ExecOptions) {
  let totalData = ''
  let resolve: Function

  const emit = () => new Promise((res, _rej) => {
    options?.processKiller?.add(kill)

    resolve = () => {
      res(undefined)
      process.kill()
    };

    const process = spawn(
      command.split(' ').shift()!,
      command.split(' ').slice(1),
      options || {}
    )

    process.stderr!.on('data', (err: Buffer) => _rej(new Error(err.toString())))
    process.stdout!.on('close', () => {
      res(totalData)
      options?.processKiller?.delete(kill)
    })
    process.stdout!.on('data', (data: Buffer) => {
      totalData += data.toString()
    })

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

  const kill = () => {
    resolve()
  }

  return {
    emit,
    kill,
    waitForOutput
  }
}