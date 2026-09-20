import memoryDriver from 'unstorage/drivers/memory'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  const driver = memoryDriver()

  storage.mount(STORAGE__KV_BASE_NAME, driver)
})
