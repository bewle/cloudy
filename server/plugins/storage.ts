import fsDriver from 'unstorage/drivers/fs'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  const driver = fsDriver({
    base: STORAGE__KV_BASE_DIR,
  })

  storage.mount(STORAGE__KV_BASE_NAME, driver)
})
