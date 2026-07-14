import { useEffect, useMemo, useState } from 'react'
import { matchesQuery } from '../utils/jsonSearch'

const DEBOUNCE_MS = 250

export function useRecordSearch(searchableRecords, searchQuery) {
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase())
    }, DEBOUNCE_MS)
    return () => clearTimeout(handle)
  }, [searchQuery])

  const filteredIndices = useMemo(() => {
    if (!debouncedQuery) return searchableRecords.map((_, index) => index)
    const result = []
    for (let i = 0; i < searchableRecords.length; i += 1) {
      if (matchesQuery(searchableRecords[i], debouncedQuery)) result.push(i)
    }
    return result
  }, [searchableRecords, debouncedQuery])

  return { filteredIndices, debouncedQuery }
}
