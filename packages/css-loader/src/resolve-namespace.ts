import { createHash } from 'crypto'

export function resolveNamespace(filepath: string) {
  const h = createHash('sha1')

  h.write(filepath)

  return 's' + h.digest('hex').slice(0, 6)
}