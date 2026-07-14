import { ChevronDownIcon, ChevronRightIcon } from './icons'
import { formatPrimitive, valueTokenClass } from '../utils/jsonHighlight'

function KeyPrefix({ keyName }) {
  if (keyName == null) return null
  return (
    <>
      <span className="tok-key">&quot;{keyName}&quot;</span>
      <span className="tok-punct">: </span>
    </>
  )
}

function Disclosure({ path, isCollapsed, onToggleCollapse }) {
  return (
    <button
      type="button"
      className="json-disclosure"
      onClick={() => onToggleCollapse(path)}
      aria-label={isCollapsed ? 'Expand' : 'Collapse'}
      aria-expanded={!isCollapsed}
    >
      {isCollapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
    </button>
  )
}

export function JsonTreeNode({ line, lineNumber, onToggleCollapse }) {
  const { kind, depth, keyName, comma } = line

  let disclosure = null
  let content

  if (kind === 'empty') {
    content = (
      <>
        <KeyPrefix keyName={keyName} />
        <span className="tok-punct">
          {line.open}
          {line.close}
          {comma}
        </span>
      </>
    )
  } else if (kind === 'collapsed') {
    disclosure = <Disclosure path={line.path} isCollapsed onToggleCollapse={onToggleCollapse} />
    content = (
      <>
        <KeyPrefix keyName={keyName} />
        <span className="tok-punct">{line.open}</span>
        <span className="tok-muted">&hellip;</span>
        <span className="tok-punct">
          {line.close}
          {comma}
        </span>
      </>
    )
  } else if (kind === 'open') {
    disclosure = (
      <Disclosure path={line.path} isCollapsed={false} onToggleCollapse={onToggleCollapse} />
    )
    content = (
      <>
        <KeyPrefix keyName={keyName} />
        <span className="tok-punct">{line.open}</span>
      </>
    )
  } else if (kind === 'close') {
    content = (
      <span className="tok-punct">
        {line.close}
        {comma}
      </span>
    )
  } else {
    content = (
      <>
        <KeyPrefix keyName={keyName} />
        <span className={valueTokenClass(line.value)}>{formatPrimitive(line.value)}</span>
        <span className="tok-punct">{comma}</span>
      </>
    )
  }

  return (
    <div className="json-line">
      <span className="json-line-number">{lineNumber}</span>
      <span className="json-line-content">
        <span className="json-indent" style={{ width: depth * 16 }} />
        <span className="json-disclosure-slot">{disclosure}</span>
        {content}
      </span>
    </div>
  )
}
