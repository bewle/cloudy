import type { InputSourceOption } from '../constants/input'

export function setImageQuality(url: string, quality: SCImageFormat) {
  return url.replace(RE__SC_IMAGE_QUALITY, `-${quality}`)
}

export function resolveTrackArtist(trackMeta: SCTrackSummary) {
  const { user, publisher_metadata } = trackMeta
  return publisher_metadata?.artist ?? user.username
}

export function resolveTrackDate(trackMeta: SCTrackSummary) {
  const { created_at } = trackMeta
  return created_at
}

export async function resolveHqImageUrl(url: string) {
  if (!SC__IMAGE_FORMAT_EXTENSIONS.some(ext => url.endsWith(ext))) return url

  for (const quality of SC__IMAGE_QUALITY_TIERS_DESC) {
    const urlWithQuality = setImageQuality(url, quality)
    const [err, res] = await attemptAsync(() => fetch(urlWithQuality, { method: 'HEAD' }))
    if (err || !res?.ok) continue
    return urlWithQuality
  }

  return url
}

export function getTrackFilename(trackMeta: SCTrackSummary, extension: string) {
  const { user, title, publisher_metadata } = trackMeta
  const artist = publisher_metadata?.artist ?? user.username

  return `${artist} - ${title}${extension}`
}

export function normalizeTrackExtension(extension: string) {
  switch (extension.toLowerCase()) {
    case '.mp4':
      return '.m4a'
    default:
      return extension
  }
}

export async function getTrackCoverBuffer(trackMeta: SCTrackSummary) {
  const { artwork_url, user } = trackMeta
  const { avatar_url } = user ?? {}

  const artworkUrl = artwork_url ?? avatar_url
  if (!artworkUrl) return

  const parsed = parseURL(artworkUrl)
  parsed.pathname = parsed.pathname?.replace('large', 'original') ?? ''

  const hqUrl = await resolveHqImageUrl(stringifyParsedURL(parsed))

  const [err, res] = await attemptAsync(() =>
    $fetch<ArrayBuffer>(hqUrl, { responseType: 'arrayBuffer' }),
  )
  if (err) return
  return res ?? undefined
}

export function getUrlType(url: string): InputSourceOption | undefined {
  const parsed = parseURL(withoutTrailingSlash(url))
  if (parsed.host !== 'soundcloud.com') return

  const segments = parsed.pathname?.split('/').filter(Boolean) ?? []
  if (!segments[0] || SC__RESERVED_PATHS.includes(segments[0])) return

  if (segments.length === 1) return 'artist'
  if (segments.length === 2) return 'track'
  if (segments.length === 3 && segments[1] === 'sets') return 'playlist'
  if (segments.length === 3 && segments[2].startsWith('s-')) return 'track'
}

export function transcodingToMime(transcoding: SCTranscodingType) {
  return SC__TRANSCODING_MIME_TYPE_MAP[transcoding]
}

export function transcodingToExt(transcoding: SCTranscodingType) {
  return SC__TRANSCODING_EXTENSION_MAP[transcoding]
}

// export const getTrackTags = async (trackMeta: SCTrackSummary): Promise<MetadataTags> => {
// export const getTrackTags = async (trackMeta: SCTrackSummary) => {

//   const cover = await getTrackCoverBuffer(trackMeta)

//   const artist = resolveTrackArtist(trackMeta)
//   const title = trackMeta.title
//   // const comment = trackMeta.description
//   //   ? [
//   //       {
//   //         descriptor: 'description',
//   //         language: 'eng',
//   //         text: ,
//   //       },
//   //     ]
//   //   : undefined
//   const genre = trackMeta.genre ?? undefined
//   const date = resolveTrackDate(trackMeta)

//   return {
//     artist,
//     title,
//     comment: trackMeta.description ?? undefined,

//     v2: {
//       APIC: !cover
//         ? []
//         : [
//             {
//               data: Array.from(new Uint8Array(cover)),
//               description: 'Track cover',
//               format: 'image/jpeg',
//               type: 3,
//             },
//           ],
//       TPE1: artist,
//       TIT2: title,
//       COMM: comment,
//       TCON: genre,
//       TDAT: date,
//     },
//   }

//   // return {
//   //   artist,
//   //   comment: description,
//   //   date,
//   //   genre,
//   //   images: !cover
//   //     ? []
//   //     : [
//   //         {
//   //           data: new Uint8Array(cover),
//   //           kind: 'coverFront',
//   //           mimeType: 'image/jpeg',
//   //         },
//   //       ],
//   //   title,
//   // }
// }
