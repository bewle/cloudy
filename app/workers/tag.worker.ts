import {
  BufferSource,
  BufferTarget,
  Conversion,
  Input,
  Mp3OutputFormat,
  Output,
  HLS_FORMATS,
} from 'mediabunny'

import type { TagWorkerPayload, TagWorkerResponse } from '~/utils/tag'

const conversions = new Map<string, Conversion | null>()

globalThis.addEventListener('message', async (payload: MessageEvent<TagWorkerPayload>) => {
  if (!('action' in payload.data)) throw new Error('Invalid tag worker payload')

  if (payload.data.action === 'cancel') {
    await conversions.get(payload.data.id)?.cancel()
    conversions.delete(payload.data.id)
    return
  }

  const { buffer, tags, id } = payload.data
  conversions.set(id, null)

  try {
    const input = new Input({
      formats: HLS_FORMATS,
      source: new BufferSource(buffer),
    })

    const output = new Output({
      format: new Mp3OutputFormat(),
      target: new BufferTarget(),
    })

    const conversion = await Conversion.init({
      input,
      output,
      tags,
    })

    if (!conversions.has(id)) return
    conversions.set(id, conversion)

    await conversion.execute()

    const result = output.target.buffer!

    const res: TagWorkerResponse = {
      action: 'tag',
      buffer: result,
      id,
    }

    globalThis.postMessage(res, [result])
  } catch (err) {
    const res: TagWorkerResponse = {
      action: 'tag',
      error: err instanceof Error ? err.message : String(err),
      id,
    }

    globalThis.postMessage(res)
  } finally {
    conversions.delete(id)
  }
})
