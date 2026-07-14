const PRIMARY_KEYS = [
  'session_id',
  'id',
  'uuid',
  'request_id',
  'conversation_id',
  'timestamp',
  'created_at',
]

const SECONDARY_KEYS = ['message', 'event', 'type', 'name', 'title', 'content', 'description']

function isPrimitive(value) {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

function firstPrimitive(record, exclude) {
  if (!record || typeof record !== 'object') return String(record)
  for (const key of Object.keys(record)) {
    if (key === exclude) continue
    const value = record[key]
    if (isPrimitive(value) && value !== null && value !== '') {
      return String(value)
    }
  }
  return null
}

export function getRecordPreview(record) {
  if (record === null || typeof record !== 'object' || Array.isArray(record)) {
    return { primary: String(record), secondary: null }
  }

  let primaryKey = PRIMARY_KEYS.find(
    (key) => isPrimitive(record[key]) && record[key] !== null && record[key] !== '',
  )
  let primary = primaryKey ? String(record[primaryKey]) : null

  let secondaryKey = SECONDARY_KEYS.find(
    (key) => isPrimitive(record[key]) && record[key] !== null && record[key] !== '',
  )
  let secondary = secondaryKey ? String(record[secondaryKey]) : null

  if (!primary) {
    primary = firstPrimitive(record, secondaryKey) || 'No preview available'
  }
  if (!secondary) {
    secondary = firstPrimitive(record, primaryKey)
  }

  return { primary, secondary }
}
