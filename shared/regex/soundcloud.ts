export const RE__SC_SCRIPT_TAG = /<script\b(?=[^>]*\ssrc\s*=\s*(["'])([^"']*)\1)[^>]+>/g
export const RE__SC_CLIENT_ID_STRING = /client_id:"([A-Z0-9]+)"/i
export const RE__SC_TRANSCODING_MIME_TYPES = [
  /^audio\/mp4;\s*codecs="mp4a(\.\d+)*"$/, // current aac
  /^audio\/mpeg$/, // legacy mp3
  /^audio\/ogg;\s*codecs="opus"$/, // legacy opus
  /^audio\/mpegurl$/, // don't bother
] as const
export const RE__SC_IMAGE_QUALITY = /-(?<quality>[a-z0-9]+)(?=\.(?:jpe?g|png)(?:[?#]|$))/i
