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

globalThis.addEventListener('message', async (payload: MessageEvent<TagWorkerPayload>) => {
  if (!('action' in payload.data)) throw new Error('Invalid tag worker payload')

  const { buffer, tags, id } = payload.data

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
  }
})
