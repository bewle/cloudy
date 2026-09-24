export const SETTINGS__COOKIE_NAME = 'cloudy:settings'
export const SETTINGS__DEFAULT: Settings = {
  metadataFrames: ['APIC', 'COMM', 'TCON', 'TDAT', 'TIT2', 'TPE1', 'WOAS'],
  preferredFormat: 'mp3',
}

export const SETTINGS__METADATA = {
  metadataFrames: {
    options: ['APIC', 'COMM', 'TCON', 'TDAT', 'TIT2', 'TPE1', 'WOAS'] as ID3FrameIdWritable[],
    type: 'select',
  },
  preferredFormat: {
    options: ['aac', 'mp3', 'opus'] as SCTranscodingType[],
    type: 'picklist',
  },
} satisfies Record<keyof Settings, SettingMetadata>
