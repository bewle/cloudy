export const useSidebarState = createGlobalState(() => {
  const tab = ref<SidebarButtonKey | undefined>()
  const previousTab = refDefault(usePrevious(tab), SIDEBAR__BUTTON_KEYS[0])
  const multitrackList = shallowReactive(new Set<string>())
  const artist = ref<string>() // url
  const playlist = ref<string>() // url

  const artistMeta = useArtistMeta(artist)
  const multitrackMeta = useMultitrackMeta(multitrackList)
  const playlistMeta = usePlaylistMeta(playlist)

  return {
    artist,
    artistMeta,
    multitrackList,
    multitrackMeta,
    playlist,
    playlistMeta,
    previousTab,
    tab,
  }
})
