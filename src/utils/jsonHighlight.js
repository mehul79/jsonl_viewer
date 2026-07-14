export function valueTokenClass(value) {
  if (value === null) return 'tok-null'
  switch (typeof value) {
    case 'string':
      return 'tok-string'
    case 'number':
      return 'tok-number'
    case 'boolean':
      return 'tok-boolean'
    default:
      return 'tok-punct'
  }
}

export function formatPrimitive(value) {
  if (value === null) return 'null'
  if (typeof value === 'string') return JSON.stringify(value)
  return String(value)
}
