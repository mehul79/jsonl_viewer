import { buildSearchableText } from './jsonSearch'

export function parseJsonl(text) {
  const lines = text.split(/\r?\n/)
  const records = []
  const searchableRecords = []
  let errorCount = 0

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.length === 0) continue

    try {
      const value = JSON.parse(line)
      records.push(value)
      searchableRecords.push(buildSearchableText(value))
    } catch {
      errorCount += 1
    }
  }

  return { records, searchableRecords, errorCount }
}
