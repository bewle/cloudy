import fsDriver from 'unstorage/drivers/fs'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  const driver = fsDriver({
    base: KV__BASE_DIR,
  })

  storage.mount(KV__BASE_NAME, driver)
})
