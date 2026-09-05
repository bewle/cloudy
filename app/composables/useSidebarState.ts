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

  return { tab }
})
