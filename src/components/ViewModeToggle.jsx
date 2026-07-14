export function ViewModeToggle({ viewMode, onChange }) {
  return (
    <div className="view-mode-toggle" role="group" aria-label="View mode">
      <button
        type="button"
        className={viewMode === 'full' ? 'active' : ''}
        aria-pressed={viewMode === 'full'}
        onClick={() => onChange('full')}
      >
        Full JSON
      </button>
      <button
        type="button"
        className={viewMode === 'attributes' ? 'active' : ''}
        aria-pressed={viewMode === 'attributes'}
        onClick={() => onChange('attributes')}
      >
        Attributes Only
      </button>
    </div>
  )
}
