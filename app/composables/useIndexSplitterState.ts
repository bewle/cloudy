export const useIndexSplitterState = () =>
  useCookie<number[]>('index-splitter-layout', { default: () => [GENERAL__INDEX_DEFAULT_SIZE] })
