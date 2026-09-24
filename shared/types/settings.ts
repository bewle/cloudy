export interface Settings {
  preferredFormat: SCTranscodingType
  metadataFrames: ID3FrameIdWritable[]
  fallbackFormat: {
    enabled: boolean
    format: SCTranscodingType
  }
}

export type SettingMetadata = {
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
