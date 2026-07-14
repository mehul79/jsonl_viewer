import { useCallback, useEffect, useRef, useState } from 'react'
import { RecordListItem } from './RecordListItem'

const ROW_HEIGHT = 60
const OVERSCAN = 6

export function RecordList({ indices, records, selectedIndex, onSelect }) {
  const containerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined

    setViewportHeight(node.clientHeight)
    const observer = new ResizeObserver((entries) => {
      setViewportHeight(entries[0].contentRect.height)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleScroll = useCallback(() => {
    setScrollTop(containerRef.current?.scrollTop ?? 0)
  }, [])

  if (indices.length === 0) {
    return <div className="record-list-empty">No matching records</div>
  }

  const total = indices.length
  const totalHeight = total * ROW_HEIGHT
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
  const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT) + OVERSCAN * 2
  const endIndex = Math.min(total, startIndex + Math.max(visibleCount, 1))

  const items = []
  for (let i = startIndex; i < endIndex; i += 1) {
    const recordIndex = indices[i]
    items.push(
      <RecordListItem
        key={recordIndex}
        record={records[recordIndex]}
        index={recordIndex}
        isSelected={recordIndex === selectedIndex}
        onSelect={onSelect}
        style={{
          position: 'absolute',
          top: i * ROW_HEIGHT,
          left: 0,
          right: 0,
          height: ROW_HEIGHT,
        }}
      />,
    )
  }

  return (
    <div
      className="record-list"
      ref={containerRef}
      onScroll={handleScroll}
      role="listbox"
      aria-label="Records"
    >
      <div style={{ position: 'relative', height: totalHeight }}>{items}</div>
    </div>
  )
}
