import { SC__TRANSCODINGS } from './soundcloud'

export const SETTINGS__COOKIE_NAME = 'cloudy:settings'
export const SETTINGS__DEFAULT: Settings = {
  fallbackFormat: {
    enabled: true,
    format: 'mp3',
  },
  metadataFrames: ['APIC', 'COMM', 'TCON', 'TDAT', 'TIT2', 'TPE1', 'WOAS'],
  preferredFormat: 'mp3',
}

// oxlint-disable-next-line sort-keys
export const SETTINGS__METADATA = {
  metadataFrames: {
    options: ['APIC', 'COMM', 'TCON', 'TDAT', 'TIT2', 'TPE1', 'WOAS'] as ID3FrameIdWritable[],
    type: 'select',
  },
  preferredFormat: {
    options: ['aac', 'mp3', 'opus'] as SCTranscodingType[],
    type: 'picklist',
  },
  fallbackFormat: {
    options: SC__TRANSCODINGS as unknown as SCTranscodingType[],
    type: 'picklist',
  },
} satisfies Record<keyof Settings, SettingMetadata>
