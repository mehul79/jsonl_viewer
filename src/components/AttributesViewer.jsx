import { useEffect, useMemo, useRef, useState } from 'react'
import { extractAttributes } from '../utils/extractAttributes'
import { ChevronDownIcon, ChevronRightIcon } from './icons'

function AttributeNode({ node, depth, collapsedPaths, onToggleCollapse }) {
  const isExpandable = node.children.length > 0
  const isCollapsed = collapsedPaths.has(node.path)

  return (
    <>
      <div className="attributes-line" style={{ paddingLeft: depth * 16 }}>
        <span className="json-disclosure-slot">
          {isExpandable && (
            <button
              type="button"
              className="json-disclosure"
              onClick={() => onToggleCollapse(node.path)}
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
            </button>
          )}
        </span>
        <span className="attributes-key">{node.key}</span>
      </div>
      {isExpandable &&
        !isCollapsed &&
        node.children.map((child) => (
          <AttributeNode
            key={child.path}
            node={child}
            depth={depth + 1}
            collapsedPaths={collapsedPaths}
            onToggleCollapse={onToggleCollapse}
          />
        ))}
    </>
  )
}

export function AttributesViewer({ record, recordKey, wrapEnabled }) {
  const collapsedByRecord = useRef(new Map())
  const [collapsedPaths, setCollapsedPaths] = useState(() => new Set())
  const tree = useMemo(() => extractAttributes(record), [record])

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

  return (
    <div className={`attributes-viewer${wrapEnabled ? ' wrap' : ''}`}>
      {tree.map((node) => (
        <AttributeNode
          key={node.path}
          node={node}
          depth={0}
          collapsedPaths={collapsedPaths}
          onToggleCollapse={toggleCollapse}
        />
      ))}
    </div>
  )
}
