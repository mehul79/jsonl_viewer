function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function nodeForValue(key, value, path) {
  if (isPlainObject(value)) {
    return {
      key,
      path,
      kind: 'object',
      children: Object.keys(value).map((childKey) =>
        nodeForValue(childKey, value[childKey], `${path}.${childKey}`),
      ),
    }
  }

  if (Array.isArray(value)) {
    const objectItem = value.find((item) => isPlainObject(item))
    if (objectItem) {
      return {
        key: `${key}[]`,
        path,
        kind: 'array-of-objects',
        children: Object.keys(objectItem).map((childKey) =>
          nodeForValue(childKey, objectItem[childKey], `${path}.${childKey}`),
        ),
      }
    }
    return { key: `${key}[]`, path, kind: 'array-of-primitives', children: [] }
  }

  return { key, path, kind: 'primitive', children: [] }
}

export function extractAttributes(record) {
  if (!isPlainObject(record)) {
    return [{ key: '(primitive value)', path: 'root', kind: 'primitive', children: [] }]
  }
  return Object.keys(record).map((key) => nodeForValue(key, record[key], key))
}
