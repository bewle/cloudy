export const INPUT__OPTIONS = ['track', 'artist', 'playlist'] as const
export type InputOption = (typeof INPUT__OPTIONS)[number]
