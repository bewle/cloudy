export const useInputForm = createSharedComposable(() => {
  const inputField = useState('input:field', () => '')
  const inputOption = useState<InputOption>('input:option', () => 'track')

  return {
    inputField,
    inputOption,
  }
})
