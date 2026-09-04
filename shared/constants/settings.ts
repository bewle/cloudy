export const SETTINGS__COOKIE_NAME = 'cloudy:settings'
export const SETTINGS__DEFAULT: Settings = {
  metadataFrames: ['APIC', 'COMM', 'TDAT', 'TIT2', 'TPE1', 'WOAS'],
  preferredFormat: 'mp3',
}

export const SETTINGS__METADATA: Record<keyof Settings, SettingMetadata> = {
  metadataFrames: {
    description: 'ID3 frames to be written to downloaded files',
    options: ['APIC', 'COMM', 'TDAT', 'TIT2', 'TPE1', 'WOAS'],
    title: 'Metadata frames',
    type: 'select',
  },
  preferredFormat: {
    options: ['mp3', 'aac', 'opus'],
    title: 'Preferred format',
    type: 'picklist',
  },
}
