export function bufferToBlob(buffer: ArrayBuffer | ArrayBuffer[], type: string) {
  return new Blob(Array.isArray(buffer) ? buffer : [buffer], { type })
}
