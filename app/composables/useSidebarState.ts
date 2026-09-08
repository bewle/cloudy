// oxlint-disable-next-line sort-keys
export const sidebarTabIconMap = {
  multitrack: ICON__MULTITRACK,
  artist: ICON__ARTIST,
  playlist: ICON__PLAYLIST,
}
export type SidebarTab = keyof typeof sidebarTabIconMap

export const sidebarTabNameMap: Record<SidebarTab, string> = {
  artist: 'Artist',
  multitrack: 'Multi-track',
  playlist: 'Playlist',
}

export const useSidebarState = createGlobalState(() => {
  const tab = ref<SidebarTab | undefined>()
  const multitrackList = shallowReactive(new Set<string>())
  const artist = ref<string>() // url
  const playlist = ref<string>() // url

  const artistMeta = useArtistMeta(artist)
  const playlistMeta = usePlaylistMeta(playlist)

  return { artist, artistMeta, multitrackList, playlist, playlistMeta, tab }
})
