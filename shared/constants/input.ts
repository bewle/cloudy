export const INPUT__SOURCE_OPTIONS = ['track', 'artist', 'playlist'] as const
export const INPUT__OPTIONS = [...INPUT__SOURCE_OPTIONS, 'multitrack'] as const
export type InputOption = (typeof INPUT__OPTIONS)[number]
export type InputSourceOption = (typeof INPUT__SOURCE_OPTIONS)[number]

export const INPUT__FIELD_PLACEHOLDERS = [
  'https://soundcloud.com/gunjump/komodo',
  'https://soundcloud.com/2blacktoostrong/fraxinus-americana',
  'https://soundcloud.com/yimellonline/girlhop',
  'https://soundcloud.com/user-929794849/bed2',
  'https://soundcloud.com/goodnightbed/whispering-window-part-8',
  'https://soundcloud.com/ragzthewizard/penance',
  'https://soundcloud.com/hav-lyfe/truliza4u',
  'https://soundcloud.com/aerateloops/its-all-up',
]
