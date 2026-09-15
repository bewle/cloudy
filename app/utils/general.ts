export function toggleTheme() {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
