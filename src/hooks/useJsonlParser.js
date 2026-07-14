import { useCallback, useState } from 'react'
import { parseJsonl } from '../utils/parseJsonl'

const ACCEPTED_EXTENSIONS = ['.jsonl', '.ndjson']

export function useJsonlParser() {
  const [records, setRecords] = useState([])
  const [searchableRecords, setSearchableRecords] = useState([])
  const [uploadedFile, setUploadedFile] = useState(null)
  const [parseErrors, setParseErrors] = useState(0)
  const [loadError, setLoadError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadFile = useCallback(async (file) => {
    if (!file) return

    const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext),
    )
    if (!hasValidExtension) {
      setLoadError('Unsupported file type. Please upload a .jsonl or .ndjson file.')
      return
    }

    setIsLoading(true)
    setLoadError(null)

    try {
      const text = await file.text()
      const { records: parsed, searchableRecords: searchable, errorCount } = parseJsonl(text)

      if (parsed.length === 0 && errorCount === 0) {
        setLoadError('This file is empty.')
        setIsLoading(false)
        return
      }

      setRecords(parsed)
      setSearchableRecords(searchable)
      setParseErrors(errorCount)
      setUploadedFile({ name: file.name, size: file.size })
    } catch {
      setLoadError('Could not read this file.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    records,
    searchableRecords,
    uploadedFile,
    parseErrors,
    loadError,
    isLoading,
    loadFile,
  }
}
