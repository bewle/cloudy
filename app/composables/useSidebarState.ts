export const useSidebarState = createGlobalState(() => {
  const tab = ref<SidebarButtonKey | undefined>()
  const previousTab = refDefault(usePrevious(tab), SIDEBAR__BUTTON_KEYS[0])
  const shownTab = computed(() => tab.value ?? previousTab.value)

  const multitrackList = shallowReactive(new Set<string>())
  const artist = ref<string>() // url
  const playlist = ref<string>() // url

  const isSidebarPanel = useMediaQuery('(min-width: 69rem)', { ssrWidth: 1920 })

  const animating = refAutoReset(false, 150)
  watch(tab, () => (animating.value = true))

  const artistMeta = useArtistMeta(artist)
  const multitrackMeta = useMultitrackMeta(multitrackList)
  const playlistMeta = usePlaylistMeta(playlist)

  return {
    animating,
    artist,
    artistMeta,
    isSidebarPanel,
    multitrackList,
    multitrackMeta,
    playlist,
    playlistMeta,
    previousTab,
    shownTab,
    tab,
  }
})
