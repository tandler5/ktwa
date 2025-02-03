// API composable pro CRUD metody
export function useApi() {
  const abortController = shallowRef(new AbortController())
  const instance = getCurrentInstance()
  if (instance) {
    onErrorCaptured((e) => {
      if (e?.message?.includes('aborted')) return false
    })
    onUnmounted(() => {
      abortController.value.abort()
    })
  }

  const fetch = async <Type, Meta>(
    method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE',
    url: string,
    params: object = {},
    data: object | null = null,
    headerOptions: {[key: string]: string} | object | null = null,
    abortPropsController: AbortController | undefined = undefined
  ) => {
    let headers: {[index: string]: string} = {
      Accept: 'application/json',
    }

    if (headerOptions) {
      headers = {...headers, ...headerOptions}
    }
    if (abortPropsController) {
      abortController.value = abortPropsController
    }

    const requestURL = `/api${url}`
    const response = await $fetch<{
      data: Type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta: {total?: number; hasMorePages?: boolean; validationErrors?: any[]} & Meta
    }>(requestURL, {
      params,
      method,
      body: data,
      headers,
      signal: abortController.value.signal,
    }).catch(async (error) => {
      throw createError({
        ...error,
        statusCode: error.status,
        data: {serverError: true},
      })
    })

    return response
  }

  const get = async <Type, Meta = undefined, SpecificType = {data: Type}>(
    url: string,
    params?: object,
    headerOptions: object | null = null,
    signal: AbortController | undefined = undefined
  ) => {
    return (await fetch<Type, Meta>(
      'GET',
      url,
      params,
      null,
      headerOptions,
      signal
    )) as SpecificType
  }
  const put = async <Type, Meta = undefined>(
    url: string,
    data: object,
    headerOptions: object | null = null,
    signal: AbortController | undefined = undefined
  ) => {
    return await fetch<Type, Meta>('PUT', url, undefined, data, headerOptions, signal)
  }
  const patch = async <Type, Meta = undefined>(
    url: string,
    data: object,
    headerOptions: object | null = null,
    signal: AbortController | undefined = undefined
  ) => {
    return await fetch<Type, Meta>('PATCH', url, undefined, data, headerOptions, signal)
  }
  const post = async <Type, Meta = undefined>(
    url: string,
    data: object | undefined = undefined,
    headerOptions: object | null = null,
    signal: AbortController | undefined = undefined
  ) => {
    return await fetch<Type, Meta>('POST', url, undefined, data, headerOptions, signal)
  }
  // delete je JS reserved word
  const remove = async <Type, Meta = undefined>(url: string, params?: object) => {
    return await fetch<Type, Meta>('DELETE', url, params)
  }

  return {
    get,
    put,
    post,
    patch,
    remove,
  }
}
