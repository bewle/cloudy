export function bufferToBlob(buffer: ArrayBuffer | ArrayBuffer[], type: string) {
  return new Blob(Array.isArray(buffer) ? buffer : [buffer], { type })
}

export function getZipFileName() {
  return `cloudy-${new Date().toISOString()}.zip`
}
