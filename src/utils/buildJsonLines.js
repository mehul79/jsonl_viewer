function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function walk(value, keyName, path, depth, comma, collapsedPaths, lines) {
  const isArray = Array.isArray(value)
  const isObject = !isArray && isPlainObject(value)

  if (isArray || isObject) {
    const entries = isArray ? value.map((item, i) => [i, item]) : Object.entries(value)
    const open = isArray ? '[' : '{'
    const close = isArray ? ']' : '}'

    if (entries.length === 0) {
      lines.push({ kind: 'empty', keyName, depth, open, close, comma })
      return
    }

    const isCollapsed = collapsedPaths.has(path)

    if (isCollapsed) {
      lines.push({ kind: 'collapsed', keyName, depth, path, open, close, comma })
      return
    }

    lines.push({ kind: 'open', keyName, depth, path, open, comma: '' })
    entries.forEach(([childKey, childValue], index) => {
      const childPath = isArray ? `${path}[${childKey}]` : `${path}.${childKey}`
      const childComma = index === entries.length - 1 ? '' : ','
      walk(
        childValue,
        isArray ? null : childKey,
        childPath,
        depth + 1,
        childComma,
        collapsedPaths,
        lines,
      )
    })
    lines.push({ kind: 'close', depth, close, comma })
    return
  }

  lines.push({ kind: 'primitive', keyName, depth, value, comma })
}

export function buildJsonLines(record, collapsedPaths) {
  const lines = []
  walk(record, null, '$', 0, '', collapsedPaths, lines)
  return lines
}
