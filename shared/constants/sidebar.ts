export const SIDEBAR__BUTTON_KEYS = [
  'multitrack',
  'artist',
  'playlist',
  'downloads',
  'themeToggle',
  'settings',
] as const
export const SIDEBAR__BUTTON_META = {
  artist: {
    icon: ICON__ARTIST,
    isTab: true,
    isTrackSource: true,
    section: 1,
  },
  downloads: {
    icon: ICON__DOWNLOAD,
    isTab: true,
    isTrackSource: false,
    section: 2,
  },
  multitrack: {
    icon: ICON__MULTITRACK,
    isTab: true,
    isTrackSource: true,
    section: 1,
  },
  playlist: {
    icon: ICON__PLAYLIST,
    isTab: true,
    isTrackSource: true,
    section: 1,
  },
  settings: {
    icon: ICON__SETTINGS,
    isTab: true,
    isTrackSource: false,
    section: 2,
  },
  themeToggle: {
    icon: 'hi',
    isTab: false,
    isTrackSource: false,
    section: 2,
  },
} satisfies Record<
  SidebarButtonKey,
  { isTab: boolean; icon: string; section: 1 | 2; isTrackSource: boolean }
>

export type SidebarButtonKey = (typeof SIDEBAR__BUTTON_KEYS)[number]
export type SidebarTrackSourceKey = {
  [K in SidebarButtonKey]: (typeof SIDEBAR__BUTTON_META)[K]['isTrackSource'] extends true
    ? K
    : never
}[SidebarButtonKey]
