import { registerAacEncoder } from '@mediabunny/aac-encoder'
import { registerMp3Encoder } from '@mediabunny/mp3-encoder'
import {
  BufferSource,
  BufferTarget,
  Conversion,
  Input,
  Mp3OutputFormat,
  Output,
  canEncodeAudio,
  Mp4OutputFormat,
  OggOutputFormat,
  ALL_FORMATS,
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

  const { buffer, tags, id, format } = payload.data
  conversions.set(id, null)

  try {
    const trackFormat = getTrackFormat(format)
    switch (format) {
      case 'aac': {
        if (!(await canEncodeAudio('aac'))) {
          registerAacEncoder()
        }
        break
      }
      case 'mp3': {
        if (!(await canEncodeAudio('mp3'))) {
          registerMp3Encoder()
        }
        break
      }
    }

    const input = new Input({
      formats: ALL_FORMATS,
      source: new BufferSource(buffer),
    })

    const output = new Output({
      format: trackFormat,
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

function getTrackFormat(format: SCTranscodingType) {
  switch (format) {
    case 'aac':
      return new Mp4OutputFormat({ fastStart: 'in-memory' })
    case 'mp3':
      return new Mp3OutputFormat()
    case 'opus':
      return new OggOutputFormat()
    default:
      throw new Error('Unsupported format')
  }
}
