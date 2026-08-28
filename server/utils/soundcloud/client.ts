import { EvlogError } from 'evlog'
import type { AvailableRouterMethod, NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export type $SCOpts<TReq extends NitroFetchRequest = NitroFetchRequest> = Omit<
  NitroFetchOptions<TReq, AvailableRouterMethod<TReq>>,
  'baseURL'
>

export async function $scRequest<TReq extends NitroFetchRequest>(
  endpoint: TReq,
  opts: $SCOpts<TReq> = {},
) {
  let clientId = await getClientId()
  let res = await req()

  if (res.ok) return res._data

  if (res.status === 404) throw soundcloudErrors.NOT_FOUND({ internal: { res } })

  if (res.status === 401) {
    // retry once with new client id
    clientId = await getClientId(true)
    res = await req()

    if (res.ok) return res._data
  }

  throw soundcloudErrors.INVALID_RESPONSE({ internal: { res } })

  function req() {
    return $fetch.raw(endpoint, {
      ...opts,
      baseURL: SC__API_URL,
      ignoreResponseError: true,
      query: {
        client_id: clientId,
        ...opts.query,
      },
    })
  }
}

export async function $scResolve(url: string, kind: SCKind) {
  setOperation('resolve')

  const [err, res] = await attemptAsync(() =>
    $scRequest('/resolve', {
      query: {
        url,
      },
    }),
  )

  if (EvlogError.isEvlogError(err) && err.status === 404)
    throw soundcloudErrors.INPUT_URL_NOT_FOUND({ kind })
  if (isPlainObject(res) && res.kind !== kind) throw soundcloudErrors.INPUT_URL_INVALID({ kind })

  const parsed = v.safeParse(scResolveSchema, res)
  if (!parsed.success) throw soundcloudErrors.INVALID_SHAPE()

  return parsed.output
}

export async function getClientId(fresh: boolean = false) {
  setOperation('client-id')

  const kv = useKV()
  const logger = getLogger()

  if (!fresh) {
    const kvCached = await kv.get<string>(KV__KEY_CLIENT_ID)
    if (kvCached) return kvCached
  }

  logger.info('Fetching fresh client ID')

  const [siteErr, site] = await attemptAsync<string, Error>(() => $fetch<string>(SC__SITE_URL))
  if (siteErr) throw clientIdErrors.FETCH_FAILED()

  const scripts = Array.from(site.matchAll(RE__SC_SCRIPT_TAG), s => s[2])
    .filter(s => Boolean(s) && s?.startsWith('https://a-v2.sndcdn.com/assets/')) as string[]

  if (!scripts.length) throw clientIdErrors.NO_SCRIPTS_FOUND()

  let foundClientId: string | undefined
  for (const scriptUrl of scripts) {
    const [scriptErr, script] = await attemptAsync<string, Error>(() =>
      $fetch<string>(scriptUrl, { responseType: 'text' }),
    )
    if (scriptErr) continue

    const clientId = script.match(RE__SC_CLIENT_ID_STRING)
    if (clientId?.[1]) {
      foundClientId = clientId[1]
      break
    }
  }

  if (!foundClientId) throw clientIdErrors.NO_CLIENT_ID_FOUND()

  await kv.set(KV__KEY_CLIENT_ID, foundClientId)
  return foundClientId
}
