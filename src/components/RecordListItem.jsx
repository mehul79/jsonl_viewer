import { memo, useMemo } from 'react'
import { getRecordPreview } from '../utils/recordPreview'

export const RecordListItem = memo(function RecordListItem({
  record,
  index,
  isSelected,
  style,
  onSelect,
}) {
  const { primary, secondary } = useMemo(() => getRecordPreview(record), [record])

  return (
    <button
      type="button"
      className={`record-item${isSelected ? ' selected' : ''}`}
      style={style}
      onClick={() => onSelect(index)}
      aria-selected={isSelected}
      role="option"
    >
      <div className="record-item-row">
        <span className="record-item-index">#{index + 1}</span>
        <span className="record-item-timestamp">{primary}</span>
      </div>
      {secondary && <div className="record-item-secondary">{secondary}</div>}
    </button>
  )
})
