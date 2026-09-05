import { describe, expect, it } from 'vitest'

describe('parsing', () => {
  it('detects correct URL type', () => {
    const trackUrl = 'https://soundcloud.com/mycoolaccount/mynewsong'
    const privateTrackUrl = 'https://soundcloud.com/mycoolaccount/myprivatesong/s-f00b4r'
    const artistUrl = 'https://soundcloud.com/mycoolaccount'
    const playlistUrl = 'https://soundcloud.com/mycoolaccount/sets/mycoolplaylist'

    expect(getUrlType(trackUrl)).toBe('track')
    expect(getUrlType(privateTrackUrl)).toBe('track')
    expect(getUrlType(artistUrl)).toBe('artist')
    expect(getUrlType(playlistUrl)).toBe('playlist')
  })
})
