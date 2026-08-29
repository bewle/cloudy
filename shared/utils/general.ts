export async function queuePromises<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results = Array.from<R>({ length: items.length })
  const pool = new Set<Promise<void>>()

  for (let i = 0; i < items.length; i++) {
    const task = fn(items[i]!, i).then(r => {
      results[i] = r
    })
    pool.add(task)
    void task.finally(() => pool.delete(task))
    if (pool.size >= concurrency) await Promise.race(pool)
  }
  await Promise.all(pool)

  return results
}

export function concatArrayBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  const totalLength = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0)
  const result = new Uint8Array(totalLength)

  let offset = 0
  for (const buffer of buffers) {
    result.set(new Uint8Array(buffer), offset)
    offset += buffer.byteLength
  }

  return result.buffer
}
