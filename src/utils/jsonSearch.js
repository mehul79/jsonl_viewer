function appendValue(value, parts) {
  if (value === null || value === undefined) return
  if (typeof value === 'string') {
    parts.push(value.toLowerCase())
    return
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    parts.push(String(value).toLowerCase())
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) appendValue(item, parts)
    return
  }
  if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      parts.push(key.toLowerCase())
      appendValue(value[key], parts)
    }
  }
}

export function buildSearchableText(record) {
  const parts = []
  appendValue(record, parts)
  return parts.join('  ')
}

export function matchesQuery(searchableText, query) {
  if (!query) return true
  return searchableText.includes(query)
}
