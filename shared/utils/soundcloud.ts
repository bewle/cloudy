import type { MetadataTags } from 'mediabunny'

export function setImageQuality(url: string, quality: SCImageFormat) {
  return url.replace(RE__SC_IMAGE_QUALITY, `-${quality}`)
}

export function resolveTrackArtist(trackMeta: SCTrackSummary) {
  const { user, publisher_metadata } = trackMeta
  return publisher_metadata?.artist ?? user.username
}

export function resolveTrackDate(trackMeta: SCTrackSummary) {
  const { created_at } = trackMeta
  return new Date(created_at)
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

export const getTrackTags = async (trackMeta: SCTrackSummary): Promise<MetadataTags> => {
  const cover = await getTrackCoverBuffer(trackMeta)
  const artist = resolveTrackArtist(trackMeta)
  const title = trackMeta.title
  const description = trackMeta.description ?? undefined
  const genre = trackMeta.genre ?? undefined
  const date = resolveTrackDate(trackMeta)

  return {
    artist,
    title,
    date,
    genre,
    comment: description,
    images: !cover
      ? []
      : [
          {
            data: new Uint8Array(cover),
            kind: 'coverFront',
            mimeType: 'image/jpeg',
          },
        ],
  }
}
