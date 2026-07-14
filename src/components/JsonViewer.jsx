import { useEffect, useMemo, useRef, useState } from 'react'
import { JsonTreeNode } from './JsonTreeNode'
import { buildJsonLines } from '../utils/buildJsonLines'

export function JsonViewer({ record, recordKey, wrapEnabled }) {
  const collapsedByRecord = useRef(new Map())
  const [collapsedPaths, setCollapsedPaths] = useState(() => new Set())

  useEffect(() => {
    const existing = collapsedByRecord.current.get(recordKey) ?? new Set()
    collapsedByRecord.current.set(recordKey, existing)
    setCollapsedPaths(existing)
  }, [recordKey])

  const toggleCollapse = (path) => {
    setCollapsedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      collapsedByRecord.current.set(recordKey, next)
      return next
    })
  }

  const lines = useMemo(() => buildJsonLines(record, collapsedPaths), [record, collapsedPaths])

  return (
    <div className={`json-viewer${wrapEnabled ? ' wrap' : ''}`}>
      {lines.map((line, index) => (
        <JsonTreeNode
          key={index}
          line={line}
          lineNumber={index + 1}
          onToggleCollapse={toggleCollapse}
        />
      ))}
    </div>
  )
}
