import { SearchIcon } from './icons'

export function RecordSearch({ value, onChange }) {
  return (
    <div className="record-search">
      <label htmlFor="record-search-input" className="sr-only" style={visuallyHidden}>
        Search records
      </label>
      <SearchIcon aria-hidden="true" />
      <input
        id="record-search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search records..."
      />
    </div>
  )
}

const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
}
