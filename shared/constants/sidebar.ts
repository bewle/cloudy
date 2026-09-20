export const SIDEBAR__BUTTON_KEYS = [
  'multitrack',
  'artist',
  'playlist',
  'downloads',
  'themeToggle',
] as const
export const SIDEBAR__BUTTON_META = {
  artist: {
    icon: ICON__ARTIST,
    isTab: true,
    isTrackSource: true,
    label: 'Artist',
    section: 1,
  },
  downloads: {
    icon: ICON__DOWNLOAD,
    isTab: true,
    isTrackSource: false,
    label: 'Downloads',
    section: 2,
  },
  multitrack: {
    icon: ICON__MULTITRACK,
    isTab: true,
    isTrackSource: true,
    label: 'Multi-track',
    section: 1,
  },
  playlist: {
    icon: ICON__PLAYLIST,
    isTab: true,
    isTrackSource: true,
    label: 'Playlist',
    section: 1,
  },
  themeToggle: {
    icon: 'hi',
    isTab: false,
    isTrackSource: false,
    label: 'Toggle theme',
    section: 2,
  },
} satisfies Record<
  SidebarButtonKey,
  { label: string; isTab: boolean; icon: string; section: 1 | 2; isTrackSource: boolean }
>

export type SidebarButtonKey = (typeof SIDEBAR__BUTTON_KEYS)[number]
export type SidebarTrackSourceKey = {
  [K in SidebarButtonKey]: (typeof SIDEBAR__BUTTON_META)[K]['isTrackSource'] extends true
    ? K
    : never
}[SidebarButtonKey]
