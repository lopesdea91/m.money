
export const renderQueryString = (data?: object) => {
  if (!data) {
    return ''
  }
  const paramsEntries = Object.entries(data)
  const paramsLength = paramsEntries.length

  const result = paramsEntries.reduce((acc, item, i) => {
    const [key, value] = item
    const paramIndex = i + 1

    const isArray = Array.isArray(value)

    if (isArray) {
      const valueLength = value.length

      value.forEach((v: string, i: number) => {
        const strConcat = valueLength !== i + 1 ? '&' : ''

        acc += `${key}[]=${v}${strConcat}`
      })
    }

    if (!isArray) {
      acc += `${key}=${value}`
    }

    if (paramsLength !== paramIndex) {
      acc += '&'
    }

    return acc
  }, '')

  return result ? `?${result}` : ''
}

export const filterQueryString = <T extends Record<string, unknown>>(params: T) => {
  const data: Record<string, unknown> = {}

  Object.keys(params).forEach(key => {
    const value = params[key]

    if (!Number.isNaN(+String(value))) {
      data[key] = Number(value)
      return
    }

    if (value !== null && value !== '' && value !== undefined) {
      data[key] = value
      return
    }
    if (Array.isArray(value) && value.length > 0) {
      data[key] = value
    }
  })

  return data
}

export const getQueryString = <T extends Record<string, unknown>>(data: T) => renderQueryString(filterQueryString(data))