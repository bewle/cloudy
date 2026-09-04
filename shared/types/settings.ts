export interface Settings {
  preferredFormat: keyof typeof SC__TRANSCODING_MIME_TYPE_REGEX_MAP
  metadataFrames: ID3FrameIdWritable[]
}

export type SettingMetadata = {
  title: string
  description?: string
  icon?: string
} & (
  | {
      type: 'select'
      options: string[]
    }
  | {
      type: 'picklist'
      options: string[]
    }
  | {
      type: 'boolean'
    }
)
