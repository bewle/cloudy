import { defineErrorCatalog } from 'evlog'

import type { InputSourceOption } from '../constants/input'

export const validationErrors = defineErrorCatalog('validation', {
  INVALID_NEXT_HREF: {
    message: 'Invalid pagination cursor',
    status: 422,
    why: 'Cursor did not point at the SoundCloud API',
  },
  INVALID_URL: {
    message: ({ option }: { option: InputSourceOption }) => `Invalid ${option} URL`,
    status: 422,
    why: 'Input is not a valid URL',
  },
  NOT_ENOUGH_ARTIST_INFO: {
    message: 'Not enough information provided to identify an artist',
    status: 422,
  },
})

export const soundcloudErrors = defineErrorCatalog('soundcloud', {
  INPUT_URL_INVALID: {
    message: ({ kind }: { kind: SCKind }) => `Invalid ${kind} URL`,
    status: 422,
    why: 'Did you select the right option?',
  },
  INPUT_URL_NOT_FOUND: {
    message: ({ kind }: { kind: SCKind }) => `Could not find ${kind} URL`,
    status: 404,
    why: 'Did you provide a valid URL?',
  },
  INVALID_RESPONSE: {
    message: 'Invalid response from SoundCloud',
    status: 500,
    title: 'Invalid response',
  },
  INVALID_SHAPE: {
    message: 'Failed to parse body from SoundCloud',
    status: 422,
    title: 'Invalid response shape',
  },
  NOT_FOUND: {
    message: 'SoundCloud resource not found',
    status: 404,
    title: 'Not found',
  },
  NO_M3U8_URLS: {
    message: 'No URLs found in playlist file',
    status: 422,
    title: 'No m3u8 URLs found',
  },
  NO_STREAM_URL: {
    message: 'No stream URL available for inputted track',
    status: 422,
  },
  NO_TARGET_TRACK_TRANSCODINGS: {
    message: ({ transcoding }: { transcoding: SCTranscodingType }) =>
      `No ${transcoding} transcodings are available for inputted track`,
    status: 422,
  },
  NO_TRACK_TRANSCODINGS: {
    message: 'No valid transcodings are available for inputted track',
    status: 422,
  },
})

export const clientIdErrors = defineErrorCatalog('clientId', {
  FETCH_FAILED: {
    message: 'Failed to fetch DOM',
    status: 500,
  },
  NO_CLIENT_ID_FOUND: {
    message: 'Client ID not found in scripts',
    status: 500,
  },
  NO_SCRIPTS_FOUND: {
    message: 'No scripts found in DOM',
    status: 500,
  },
})

declare module 'evlog' {
  interface RegisteredErrorCatalogs {
    soundcloud: typeof soundcloudErrors
    validation: typeof validationErrors
    clientId: typeof clientIdErrors
  }
}
