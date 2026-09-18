export interface SanitizeFilenameOptions {
  fallback?: string
  maxBytes?: number
  replacement?: string
}

const WINDOWS_RESERVED_NAMES = /^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\..*)?$/i

export function sanitizeFilename(input: string, options: SanitizeFilenameOptions = {}): string {
  const { fallback = 'untitled', maxBytes = 255, replacement = '-' } = options

  if (!Number.isInteger(maxBytes) || maxBytes < 1) {
    throw new RangeError('maxBytes must be a positive integer')
  }

  if (replacement.includes('/') || replacement.includes('\\')) {
    throw new Error('replacement must not contain path separators')
  }

  let fileName = input
    .normalize('NFC')
    .replace(/[<>:"/\\|?*\p{Cc}]/gu, replacement)
    .replace(/[\u2028\u2029]/g, replacement)
    .trim()

  fileName = collapseRepeated(fileName, replacement)
  fileName = fileName.replace(/[ .]+$/g, '')

  if (!fileName || fileName === '.' || fileName === '..') {
    fileName = fallback
  }

  if (WINDOWS_RESERVED_NAMES.test(fileName)) {
    fileName = `${replacement || '-'}${fileName}`
  }

  fileName = truncateUtf8(fileName, maxBytes)
  fileName = fileName.replace(/[ .]+$/g, '')

  return fileName || truncateUtf8(fallback, maxBytes) || 'untitled'
}

function collapseRepeated(value: string, replacement: string): string {
  if (!replacement) {
    return value
  }

  let result = ''
  let index = 0

  while (index < value.length) {
    if (value.startsWith(replacement, index)) {
      result += replacement
      index += replacement.length

      while (value.startsWith(replacement, index)) {
        index += replacement.length
      }

      continue
    }

    result += value[index]
    index++
  }

  return result
}

function truncateUtf8(value: string, maxBytes: number): string {
  const encoder = new TextEncoder()

  if (encoder.encode(value).byteLength <= maxBytes) {
    return value
  }

  let result = ''

  for (const character of value) {
    const candidate = result + character

    if (encoder.encode(candidate).byteLength > maxBytes) {
      break
    }

    result = candidate
  }

  return result
}
