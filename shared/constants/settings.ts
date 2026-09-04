export const SETTINGS__COOKIE_NAME = 'cloudy:settings'
export const SETTINGS__DEFAULT: Settings = {
  preferredFormat: 'mp3',
  metadataFrames: ['APIC', 'COMM', 'TDAT', 'TIT2', 'TPE1', 'WOAS'],
}

export const SETTINGS__METADATA: Record<keyof Settings, SettingMetadata> = {
  preferredFormat: {
    title: 'Preferred format',
    type: 'picklist',
    options: ['mp3', 'aac', 'opus'],
  },
  metadataFrames: {
    title: 'Metadata frames',
    description: 'ID3 frames to be written to downloaded files',
    options: ['APIC', 'COMM', 'TDAT', 'TIT2', 'TPE1', 'WOAS'],
    type: 'select',
  },
}
